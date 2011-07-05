Need to set up a Ruby on Rails server? So do I, and chances are you need
almost the same configuration as me. As of this writing [1845 people][10] have
bookmarked [Coda Hale's excellent guide to setting up Mongrel + Apache][11] on
del.icio.us. The article has 187 comments. Why should so many people each have
to do the same thing?

   [10]: http://del.icio.us/url/345610f9ab36d015c40134eb399230bc
   [11]: http://blog.codahale.com/2006/06/19/time-for-a-grown-up-server-rails-mongrel-apache-capistrano-and-you/

The answer is a Rails server [virtual appliance][12], and [I've made one][13]
for Amazon's [EC2][14] hosting service.

   [12]: http://en.wikipedia.org/wiki/Virtual_appliance
   [13]: http://pauldowman.com/projects/ruby-on-rails-ec2/
   [14]: http://www.amazon.com/b/ref=sc_fe_l_2/102-6342260-7987311?ie=UTF8&node=201590011&no=3435361

A server is no longer a physical thing, and EC2 takes it one step further:
they completely separate the concept of server _images_ and _instances_. An
_image_ is like a snapshot of a server hard drive, stored in an unchangeable
state in their S3 data storage service. An _instance_ is a running server that
was booted from a copy of this image. But the instance is transient; changes
to it's own working copy of the image don't affect the original image that it
was booted from, and because of this multiple server instances can be started
from the same image. (Hence the "elastic" property, new instances can be
created on demand, your server pool can grow and shrink dynamically.)

Now even the OS can be configured and tested once, and then simply deployed as
part of the application. So how is that different from any of the third-party
libraries and frameworks that we use as part of our applications? I assemble
applications out of many pieces of third-party software. All of it is
continually improved by other people, none of it requires painstaking building
or configuration, and the OS can be used the same way.

So I'm going to continue working on [my Ruby on Rails EC2 server image][15]
with the goal that you will be able to simply deploy your Rails app directly
to it with Capistrano with little or no configuration.

   [15]: http://pauldowman.com/projects/ruby-on-rails-ec2/

[Try it out][16], and tell me what you think!

   [16]: http://pauldowman.com/projects/ruby-on-rails-ec2/

