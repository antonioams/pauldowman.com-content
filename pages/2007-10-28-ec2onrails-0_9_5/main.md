I've been working hard on [EC2 on Rails][10], version 0.9.5 is now available.
Since my last post here there have been some major changes:

   [10]: http://ec2onrails.rubyforge.org/

### Capistrano tasks

There is now a rubygem available that provides Capistrano tasks to manage the
instance. There are tasks to set the server's timezone, install packages and
rubygems, backup, restore, create and delete the database, set the MySQL root
password, and more. To use these in your Rails project type:
 
    > sudo gem install ec2onrails

Put [Capfile][11] in the root of your rails folder, and put [deploy.rb][12] in
the config folder.

   [11]: http://ec2onrails.rubyforge.org/svn/trunk/documentation/examples/Capfile
   [12]: http://ec2onrails.rubyforge.org/svn/trunk/documentation/examples/deploy.rb

Then, from the root of your project type:

    > cap ec2onrails:setup

This automatically sets your server's timezone, installs any custom rubygems
and Ubuntu packages, and creates your database for you. You can now deploy
your rails app as you normally would:

    > cap deploy:migrations

Another useful task for testing is:

    > cap ec2onrails:restore_db_and_deploy

This recreates the database, restores data from an S3 bucket (specified in
your deploy.rb), and deploys the app. I use this to prepare a staging server
with the current production data and current production version of the app.
After running this task I have an exact copy of my production server. I then
deploy the latest version to this server before deploying it to production.
This is a good way to be really sure your production deployment won't fail
(especially your migrations).

To see a list of all available Capistrano tasks:

    > cap -T

### New Ubuntu version

It's now built with [Ubuntu 7.10 "Gutsy"][13].

   [13]: http://www.ubuntu.com/news/ubuntu-server710

### Support for new instance types

There are both i386 and x86_64 versions available to support the new EC2
[instance types][14]. So you can now use large and extra-large instances.

   [14]: http://www.amazon.com/gp/browse.html?node=370375011

### Multiple instances

The earlier versions only worked if your rails app was running on a single
server. That was lame! Now you can have multiple instances using any
combination of these roles: web server, app server, primary database. I'm
working on adding a MySQL slave role and eventually a [Memcache][15] role.

   [15]: http://www.danga.com/memcached/

For full instructions and details see [the project web site][16].

   [16]: http://ec2onrails.rubyforge.org/

