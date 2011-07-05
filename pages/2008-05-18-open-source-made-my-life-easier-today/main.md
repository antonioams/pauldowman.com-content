The point of [EC2 on Rails][10] is to save other people from duplicating the
effort of building and configuring a Rails server on EC2. When I started it
there were no other public Ubuntu server image projects so I had to start from
scratch. I had to write a build script to build an Ubuntu image, patch the
Amazon AMI tools to work on Ubuntu, etc., before I could even begin to create
the Rails-specific stuff. And every 6 months there's a new version of Ubuntu
and I have to do at least some of that over again.

   [10]: /ec2-on-rails

But in the meantime Eric Hammond has created an excellent [Ubuntu AMI base
install project][11], it has all the necessary features like installing the
AMI tools, getting the public keys on first boot so that you can log in with
your EC2 account's private key, regenerating the ssh host keys on first boot,
etc. And it has some cool new features like the ability to [give an instance
an arbitrary script on startup][12] using EC2's "[user-supplied ][13][instance
data][13]". And, it has an [active community][14].

   [11]: http://alestic.com/
   [12]: http://groups.google.com/group/ec2ubuntu/browse_thread/thread/c228d509ef31c630
   [13]: http://docs.amazonwebservices.com/AWSEC2/2008-02-01/DeveloperGuide/AESDG-chapter-instancedata.html#instancedata-user-data-retrieval
   [14]: http://groups.google.com/group/ec2ubuntu

So why would I duplicate that effort?! I'd rather concentrate on improving the
Rails-specific features, so I've adapted my build script to be run from
Eric's. And by "adapted", I mean "took out tons of stuff that I no longer need
to care about"! And when I want to make any improvements that aren't Rails-
specific, I can contribute them to Eric's project where they'll benefit more
people.

If you're building your own custom AMI, I highly recommend using Eric's base
install script. You'll end up with a solid base for your image with way less
work, and it has a hook to easily include your own build script to customize
the build.

Version 0.9.8 of EC2 on Rails uses Eric's script for the base install, and it
will be released in a couple of days (I'm using it in production already).

Seriously, why reinvent the wheel? You gotta love open source!

