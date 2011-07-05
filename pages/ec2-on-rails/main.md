_UPDATE: I am [no longer maintaining this project][7]._

   [7]: http://pauldowman.com/2010/01/10/movin-on-status-of-ec2-on-rails/

### A Ruby on Rails EC2 "Appliance"

EC2 on Rails is an Ubuntu Linux server image for [Amazon's EC2 hosting
service][8] that's ready to run a standard [Ruby on Rails][9] application with
little or no customization. It's a Ruby on Rails [virtual appliance][10]. EC2
on Rails is [opinionated software][11]: the opinion is that for many rails
apps the server setup can be generalized and shared the same way as the web
application framework itself. For many people (Twitter, this isn't for you)
the server image can be treated the same way as other shared libraries. And if
the day comes when your needs are unique enough that EC2 on Rails can't be
configured to work for you then you can bundle your own image from it or fork
the build source and customize it. But until then, why spend your time
configuring servers?

   [8]: http://www.amazon.com/b/ref=sc_fe_l_2/102-6342260-7987311?ie=UTF8&node=201590011&no=3435361
   [9]: http://rubyonrails.org/
   [10]: http://en.wikipedia.org/wiki/Virtual_appliance
   [11]: http://gettingreal.37signals.com/ch04_Make_Opinionated_Software.php

### Background

In 2007, just as I was ready to launch an early version of [GigPark][12],
Amazon was beginning to revolutionize server hosting with the launch of their
EC2 service. EC2 was still in limited beta at the time and I was lucky enough
to get an account. EC2 was revolutionary partly because they offered
dynamically-resizable (a.k.a. "elastic") compute capacity billed by the hour.
But the really big change was that this "elastic" property required us to
think about servers differently: it separated the concept of "instance" and
"image".   It became possible to create and publish preconfigured server
"images" that anyone can use. EC2 on Rails was basically an abstraction of the
work that I was doing to configure the [GigPark][12] servers, generalized in
such a way that it would work with any standard Ruby on Rails application. It
was the first public Ruby on Rails server image ("AMI"), and in fact it was
the first public Ubuntu AMI that I know of (though [Eric Hammond][13] went on
to create what later became the definitive Ubuntu public AMI and Canonical
eventually produced official Ubuntu images). It includes such features as:

   [12]: http://www.gigpark.com/
   [13]: http://alestic.com/

  * A standard Rails deployment stack: Apache + mongrel at first (later upgraded to [Phusion Passenger][14] + [Nginx][15] in the unreleased 0.9.11 version) plus [MySQL][16] and [Memcached][17]
  * [Varnish][18]  proxy (with optional HTTP caching) in the unreleased 0.9.11 version
  * Automatic backup (including efficient incremental backup every 5 minutes) of the MySQL database to [S3][19] (EBS support was later added)
  * Automatically created hostname aliases for all other instances in the cluster
  * Process and system monitoring with [Monit][20] (later changed to the Ruby-based [God][21] monitoring daemon)
  * Easy creation of hourly, daily, weekly and monthly scripts
  * Local [Postfix][22] SMTP mail server (only available from within the instance, not listening on external network interfaces)
  * Automatic archiving of all logs to S3 nightly
  * SSL support

   [14]: http://www.modrails.com/
   [15]: http://nginx.org/
   [16]: http://mysql.com/
   [17]: http://memcached.org/
   [18]: http://varnish.projects.linpro.no/
   [19]: http://aws.amazon.com/s3/
   [20]: http://mmonit.com/monit/
   [21]: http://god.rubyforge.org/
   [22]: http://www.postfix.org/

