_UPDATE: it's 0.9.8.1 now, there was a small update to the RubyGem. The new
gem uses the same AMI's._

[EC2 on Rails][10] version 0.9.8 is now available (or will be in a few hours
when the RubyForge servers are synced). This is a recommended update for
everyone.

   [10]: http://ec2onrails.rubyforge.org/

It includes some major new features:

  * monit monitoring daemon: monitors mysqld, apache, memcached, mongrels, system load and free drive space
  * incremental MySQL backup (important for large databases)
  * Apache SSL support
  * a local [Postfix][11] SMTP server enabled by default

  [11]: http://www.postfix.org/

And most importantly this fixes the [problem with broken Ubuntu package
updates][12] which was caused by a missing repository in the list of
repositories.

   [12]: http://rubyforge.org/tracker/index.php?func=detail&aid=20040&group_id=4552&atid=17558

As I [mentioned yesterday][13], the base image is now built using [Eric
Hammond's EC2 Ubuntu][14] script.

   [13]: /2008/05/18/open-source-made-my-life-easier-today/
   [14]: http://alestic.com/

Also, there are major new features such as incremental MySQL backup (important
for large databases), Apache SSL support, and a local Postfix SMTP server
enabled by default.

My priorities now are:

  1. Release an update based on Ubuntu 8.04 Hardy (this version is still using Ubuntu 7.10 Gutsy because I wanted to provide a reliable update as quickly as possible due to bug #20040. But now that the base image is built with Eric Hammond's script it should be easy to update to Hardy.)
  2. Create complete documentation.
  3. Release a 100% bug-free version 1.0 with the current feature-set. Please help by reporting any bugs you find, either using the [RubyForge bug tracker][15] or [by email][16].

   [15]: http://rubyforge.org/tracker/index.php?group_id=4552&atid=17558
   [16]: /contact

