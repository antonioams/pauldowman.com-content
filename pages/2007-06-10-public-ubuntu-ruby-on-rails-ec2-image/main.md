**UPDATE: I have created a [new improved version of this image][10]. The new image uses mongrel_cluster, and is more Capistrano-friendly. Skip this article and [check out the new one][10]!**

   [10]: http://pauldowman.com/projects/ruby-on-rails-ec2/

I have created a ready-to run public Ubuntu and Ruby on Rails image for
[Amazon EC2][11]. (You can easily remove the Ruby on Rails stuff and use this
as a general-purpose Ubuntu image.) My goal was to make it as easy to use as
possible, so it includes a script to automate the process of re-bundling it as
your own after you make configuration changes.

   [11]: http://amazon.com/b/ref=sc_fe_l_2/105-3074875-7658040?ie=UTF8&node=201590011&no=3435361&me=A36L942TSJ2AJA

This means if you have an Amazon EC2 account you can run this image, log in
and customize it as desired, and then with one command save a copy of it as
your own.

Features include:

  * Ubuntu 7.04 Feisty with [Xen versions of standard libs][12] ([libc6-xen][13] package) for better performance.
  * All EC2 command-line tools installed
  * Custom script to re-bundle, save and register your own copy of this image in one step
  * MySQL 5
  * Ruby 1.8.5
  * Ruby on Rails 1.2.3
  * Mongrel behind Apache 2.2, all pre-configured including /etc/init.d startup script
  * MySQL and Apache configured to write logs to /mnt/log so you don't fill up the tiny root filesystem
  * Hostname set correctly to public hostname
  * NTP

   [12]: http://wiki.xensource.com/xenwiki/XenSpecificGlibc
   [13]: http://packages.ubuntu.com/feisty/libs/libc6-xen

Soon to be added:

  * Automatic MySQL backup to S3
  * Mongrel Cluster
  * Capistrano and [elastic_rails][14] support. I'd like it to be so that you can just start up an instance of this image and deploy to it.

   [14]: http://elasticrails.com/elasticrails/

The AMI id is currently ami-5d967334. **UPDATE: I have created a [new improved
version of this image][15]. Please try that one instead, this image will be
removed soon.**

   [15]: http://pauldowman.com/projects/ruby-on-rails-ec2/

### Instructions to use this public AMI:

#### 1. Sign up for an EC2 account

There is currently a waiting list, as of this writing in June 2007.

#### 2. Install the command-line tools

The tools are installed on the image, but you need a way to start an instance
of the image. [See the getting started guide for details][16]. The tools will
need your [Amazon access key identifiers][17].

   [16]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/setting-up-your-tools.html
   [17]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/account.html

#### 3. Run the instance and log in via ssh

Again, the getting started guide [describes this in detail][18]. Obviously you
can skip the "Finding a Suitable AMI" section.

   [18]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/running-an-instance.html

NOTE: at boot time it retrieves your private key via HTTP using curl, and
occasionally this fails. If you are prompted for a password and you're _sure_
that you've started the image with the right keypair and that you are
providing the right private key try rebooting the image using "ec2reboot _
<image-id>_". UPDATE: this is fixed in the [new version][19].

   [19]: http://pauldowman.com/projects/ruby-on-rails-ec2/

#### 4. Get security updates

I recommend using [aptitude][20] for package management:

  [20]: https://help.ubuntu.com/community/AptitudeSurvivalGuide

[server]# aptitude update
[server]# aptitude upgrade

**5. _(Optional)_ Remove unwanted packages**  
Again, use [aptitude][21], this time run it with no arguments on the command-
line. To completely remove a package including all it's configuration and data
select it and then press underscore ('_'). If you don't want rails just remove
the package "rubygems". But don't remove ruby itself because it's needed by
the Amazon tools.

  [21]: https://help.ubuntu.com/community/AptitudeSurvivalGuide

#### 6. Install your Rails app

Edit /etc/mongrel and set APP_DIR to the root of your rails directory. If you
want multiple mongrel containers edit /etc/init.d/mongrel and add as many as
you like to the start_cmd() and stop_cmd() sections. I assume this part will
need some tweaking.

Be mindful of where your app writes log files and other data, it should go
into /mnt because the root partition doesn't have much space and you don't
want to fill it up.

#### 7. _(Optional) _Create a new admin user (with sudo ability) and disable the root user

Ubuntu normally installs without a root user, by default you create a user
with sudo access. This is standard best practice anyway so I recommend it.

_NOTE: This new user will log in the normal way, i.e. with password rather
than using the public key._

First, create the new user and add it to the admin group:

    
    [server]# adduser _myuserid_
    [server]# adduser _myuserid_ admin

You now have a new user that can run sudo. You might want to add the following
line to the end of the new user's $HOME/.profile

    
    source /usr/local/ec2/config

This will set up environment variables needed for the EC2 command-line tools,
and add them to the path.

Now disable root login completely. Edit /etc/ssh/sshd_config and change the
line

    
    PermitRootLogin without-password

to the following:

    
    PermitRootLogin no

Then edit /etc/passwd and change the first line to:
    
{{passwd | code(text)}}

(i.e. change "/bin/bash" to "/bin/false"). Now you can only log in using your
newly created account.

#### 8. Rebundle the image

I have included a script, **rebundle.sh**, that runs all the commands to
bundle the new image, upload it to S3 and register it. It expects a directory,
**/mnt/e****c2-config**, that contains a config file and your AWS access
identifiers. The contents of the directory are the following three files:

a) cert-XXXX.pem and pk-XXXX.pem. These are the X.509 certificate and private
key files from your [Amazon access key identifiers][22].

   [22]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/account.html

b) A config file named, strangely enough, **config**. It's contents should
look like the following:

{{config | code(text)}}    

The values for those should be pretty self-explanatory except perhaps
BUCKET_BASE_NAME. It's value is used when generating a new S3 bucket to save
your bundled image. The bucket name will be this string with a time/date stamp
appended.

Once you've created /mnt/ec2-config and it's contents one command will
rebundle the current instance as a new AMI, save it to a new S3 bucket, and
register it:

    
    [server]# /usr/local/ec2/rebundle.sh

It takes a long time and there are long periods with no output so you might
want to hit a key once in a while (or set "ServerAliveInterval 60″ in your
ssh_config file) to avoid being disconnected while it's running.

At the end you should see the id of your new AMI and the name of the S3 bucket
that it's stored in.

Phew. You're done! :-)

#### A note on security

As is [standard for public AMI's][23], password-based logins for root are
disabled. This is so that neither I nor anyone else (except you) can log into
your running instance. You log in with your own public/private keypair (see
step #3), otherwise there would be a window of opportunity between system
startup and the moment you change the password. I have taken care to ensure
that my rebundle script excludes sensitive data like your AWS access
identifiers and root's .ssh/authorized_keys file.

   [23]: http://docs.amazonwebservices.com/AmazonEC2/dg/2007-01-19/public-ami-guidelines.html

#### Acknowledgements

I used the instructions on the [Atlantis Technology blog][24] to get started
with a working Ubuntu image and then many helpful posts on the Amazon Web
Services developer forum to get the Amazon EC2 tools working.

   [24]: http://blog.atlantistech.com/index.php/2006/10/04/amazon-elastic-compute-cloud-walkthrough/

