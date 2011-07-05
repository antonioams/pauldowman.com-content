_(None of this is EC2-centric, but it's particularly needed on EC2.)_

A frequent topic of discussion on the EC2 forums is how to send email
reliably, efficiently, and especially without it being marked as spam. I found
that even with a valid [SPF record][10] most mail sent from an EC2 instance
was marked as spam or silently discarded.

   [10]: http://www.openspf.org/Introduction

This is probably partly because of the lack of matching [reverse DNS
records][11]. But spam filters can be a bit arbitrary and the easiest way is
to relay outgoing mail through a good smtp provider. (I don't recommend
relaying outbound mail through Google Apps, they supposedly have a 500
messages/day limit according to many people on their forums, although I
couldn't find that published anywhere. UPDATE: The info is [here][12], thanks
John Ward.)

   [11]: http://www.spamhaus.org/faq/answers.lasso?section=ISP%20Spam%20Issues#131
   [12]: http://www.google.com/support/a/bin/answer.py?hl=en-ca&answer=59797

I have tried a couple of SMTP providers, and **I recommend [AuthSMTP][13]**.
They are reliable, have good service, and our mail that's delivered through
them almost never gets marked as spam. Also, they have monthly quotas rather
than daily, so you have a chance to increase it before you hit the limit.

   [13]: http://www.authsmtp.com/

Rather than deliver directly to the AuthSMTP mail server from your web app
it's a good idea to deliver to a local queueing mail server, which will
forward via the AuthSMTP gateway. Your web app will deliver mail to localhost
(or perhaps a dedicated instance if you prefer), port 25.

This has several advantages:

  1. Your web server can finish the request more quickly.
  2. There's less chance that the mail server will be unavailable. At least the mail will be queued locally until the remote server becomes available again. AuthSMTP has proven to be quite reliable, but it has been unavailable on a couple of occasions.
  3. [AuthSMTP limits the number of concurrent connections][14] that you can make. You can easily configure your local mail server to limit the number of outgoing connections to the gateway.

   [14]: http://www.authsmtp.com/faqs/faq-61.html

#### Configuration

I recommend using [Postfix][15], it's fast, reliable and most importantly,
easy to configure. Your Linux distribution will definitely have a Postfix
[package][16] available (it comes pre-installed on [EC2 on Rails][17]). On
Debian or Ubuntu install with:
    
   [15]: http://www.postfix.org/
   [16]: http://packages.ubuntu.com/gutsy/mail/postfix
   [17]: http://ec2onrails.rubyforge.org/

sudo aptitude install postfix

Here's the config file, `/etc/postfix/main.cf`:

{{etc-postfix-main.cf | code(text)}}    
{{etc-postfix-main.cf | download}}

How simple is that?! Have you ever seen a sendmail config file?

`soft_bounce` is important because it means that postfix will queue the
messages if they're bounced by the remote gateway for any reason (this is only
if it's bounced by the gateway, not if it's bounced by the destination
server). This would usually be caused by some configuration problem like an
authentication failure. If the message is bounced by the eventual destination
server (e.g. the mailbox doesn't exist or is full), or if the destination
server can't be contacted, your local server won't know about it because the
message has already been accepted by the gateway. (It's probably a good idea
to keep track of bounced messages returned by the eventual destination server,
see "Don't spoof the From field" below.)

`default_destination_concurrency_limit` is so you stay within [AuthSMTP's
concurrent connection limit][18]. If you have Postfix running on multiple
instances you'll need to adjust this accordingly.

   [18]: http://www.authsmtp.com/faqs/faq-61.html

To see mail that's stuck in the queue:
    
    mailq

Postfix will automatically try to resend it, but you can force it to be sent
immediately using:
    
    sudo postqueue -f

#### Monitoring

Of course you need to know if anything goes wrong with the mail delivery and
it won't be in your web app's log. I use scripts in /etc/cron.hourly to check
logs and mail me the output if there are errors. But when it comes to mail
delivery failure you might have a bit of a chicken-and-egg problem: you can't
use postfix to send the mail if postfix is having problems. Here's a simple
ruby script to send emergency mail via a different mail server. It's
configured to use Google Apps (you'll need to create a new account to send the
mail from), if you don't use Google Apps you can easily change this to use a
different mail server.

Save this as `/usr/local/bin/emergency_mail_sender`:

{{emergency_mail_sender | code(ruby)}}
{{emergency_mail_sender | download}}
    
Here's a script that can be run by cron every hour to check for mail delivery
problems, it uses the `emergency_mail_sender` script to notify you of the
problem. It works on Ubuntu (but it needs the [logtail][19] package
installed), it might not work on other systems. Save this as
`/etc/cron.hourly/check_mail_logs`
    
   [19]: http://packages.ubuntu.com/gutsy/admin/logtail

{{check_mail_logs | code(bash)}}
{{check_mail_logs | download}}

#### SPF

Here's your [SPF][20] record:
    
   [20]: http://www.openspf.org/Introduction

    v=spf1 include:authsmtp.com include:aspmx.googlemail.com ~all

If you're not using Google Apps to send mail for your domain remove
`include:aspmx.googlemail.com`. If you want to create your own SPF record
there's a good SPF record generator at [spfwizard.com][21].

   [21]: http://spfwizard.com/

#### Don't spoof the From field

You should only send mail from somebody@yourdomain.com. If you try to send
mail from somebody@pauldowman.com, for example, the receiver will see that
pauldowman.com has an SPF record, and that it doesn't authorize your mail
server. Then into the spam folder you go.

To get around this you can send from something like _noreply@yourdomain.com_,
and set the Reply-To header to _somebody@pauldowman.com_. You can even set the
name in the from field, for example: _"Paul Dowman via yoursite"
< noreply@pauldowman.com >_. The Reply-To header will make sure that most
people's replies go to the correct address, but a few will inevitably end up
at noreply@yourdomain.com so it's probably a good idea to set up an
autoresponder at that address, or at least make sure the message bounces so
the user eventually realizes the mistake.

