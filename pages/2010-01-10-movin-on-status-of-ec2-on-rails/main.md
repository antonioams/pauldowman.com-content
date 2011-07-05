I began a fun project a couple of years ago: [EC2 on Rails][10]. It became
quite widely used, people contributed some great code, and a small community
developed.

   [10]: http://pauldowman.com/projects/ruby-on-rails-ec2

I had a great vision for what it should become. But since I was very busy with
a start-up (which we [successfully sold][11] last August), I struggled to find
the time to work on it. I did a lot of work that I never ended up releasing
because I couldn't find the time for testing and fixing the last few small
bugs (though it has been in use in production with great success).

   [11]: http://pauldowman.com/2009/08/24/canpages-buys-gigpark

The hardest thing to find time for was always documentation and communication
of the status, so today I'm taking the time to clarify since I get asked a
lot:

**I won't be working on it any more.**

But open source is a wonderful thing and anyone who wants to keep using it can
fork it and do so.

Thanks to everyone who contributed features and fixes.

I apologize for letting it languish for so long, I had the best intentions to
find some more time but now that I have a [four-week old baby][12] I know that
it's impossible.

   [12]: http://pauldowman.com/2009/12/17/im-a-dad

### A great success in it's day

It felt great to be sitting in a session at RailsConf 2008 and hear the
presenter recommend EC2 on Rails.

When I first created EC2 on Rails it was the first and only Rails AMI, and in
fact it was the first public Ubuntu AMI that I know of (though [Eric
Hammond][13] went on to create what later became the definitive Ubuntu public
AMI and Canonical eventually produced official Ubuntu images).

   [13]: http://alestic.com/

In spite of the sparse documentation it was simple enough that many people
used it either as-is or as a starting point for their own custom setup.

I think there's still a great need for a simple open-source Rails server
image, but now there are at least a couple of options, and the choices for all
components of the Rails production stack have improved hugely.

Some of the custom functionality is now available via other projects like
[Marc-André Cournoyer][14]'s [mysql_s3_backup][15].

   [14]: http://macournoyer.com/
   [15]: http://github.com/macournoyer/mysql_s3_backup

### I'd do a few things differently

If I had the time to continue working on it I'd make some major changes in the
architecture:

  * I'd use [Chef][16] to configure the image instead of a build script. This would allow running instances to be upgraded more easily, allow greater customization by the user, and allow the sharing of common customizations.
  * I'd stop using Capistrano for deployment, or at least move all the code that's inside Capistrano recipes into scripts that exist on the server. ([Chef-deploy][17] looks promising but I haven't had a chance to play with it yet).
  * I would provide better support for elastic clusters (i.e. adding and removing instances from the cluster).

   [16]: http://wiki.opscode.com/display/chef/Home
   [17]: http://github.com/ezmobius/chef-deploy

I have a lot of thoughts on how those things would be achieved, feel free to
get in touch with me if you are building something similar and want to chat
about it.

### The new and improved but unreleased version

The unreleased version ([available on GitHub][18]) has been substantially
rewritten. It is now based on [Nginx][19], and [Phusion Passenger][20], and
uses the awesome [Varnish][21] proxy for balancing across multiple instances
(optionally with HTTP caching). As I mentioned it's being used in production
with great success, but there are still a few minor known issues and probably
some untested areas.

   [18]: http://github.com/pauldowman/ec2onrails
   [19]: http://nginx.org/
   [20]: http://www.modrails.com/
   [21]: http://varnish.projects.linpro.no/

Please feel free to fork it and give it new life.

