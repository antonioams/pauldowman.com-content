I finally found the time to release a new version of [EC2 on Rails][10]. It
fixes some bugs, updates some software (Rails 2.2, Rubygems 1.3.1, Ubuntu
8.04.2 LTS), and includes public images for the European EC2 region.

   [10]: http://ec2onrails.rubyforge.org/

For a full list of changes see the [change log][11].

   [11]: http://github.com/pauldowman/ec2onrails/blob/d7c29fd05dc2924a7fde1c46e3f58d1c1462ae72/gem/History.txt

My next priorities are:

  1. Integrating [other people's changes][12], especially [Adam Greene's huge changes][13] (support for [EBS][14] and much more).
  2. Improving (or you could say fixing!) multi-instance support. It should be as easy to manage your app running on an EC2 cluster as it is on a single instance. I'm now using this myself so I finally have the motivation! :-)
  3. General robustness improvements.
  4. Documentation.

   [12]: http://github.com/pauldowman/ec2onrails/network
   [13]: http://github.com/skippy/ec2onrails/commits/master/
   [14]: http://aws.amazon.com/ebs/

Please report any bugs using the [RubyForge bug tracker][15] or [by
email][16].

   [15]: http://rubyforge.org/tracker/index.php?group_id=4552&atid=17558
   [16]: /contact

