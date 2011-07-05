I've moved [EC2 on Rails][10] from Subversion to [Git][11]. It's hosted on
Github at [pauldowman/ec2onrails][12].

   [10]: http://ec2onrails.rubyforge.org/
   [11]: http://git.or.cz/
   [12]: http://github.com/pauldowman/ec2onrails

Most Ruby developers are familiar with Git by now. (If you're not: it's a
[distributed version control system][13] that was [created in 2005 by Linus
Torvalds][14] for Linux kernel development). Within the last year almost every
Ruby-based open-source project has switched to Git (including [Rails
itself][15]). And in fact they're almost all hosted on [Github][16]!

   [13]: http://betterexplained.com/articles/intro-to-distributed-version-control-illustrated/
   [14]: http://en.wikipedia.org/wiki/Git_(software)#Early_history
   [15]: http://weblog.rubyonrails.org/2008/4/11/rails-premieres-on-github
   [16]: http://github.com/

At first I found it funny that even though they were moving to a distributed
version control system, everyone decided to keep their repositories in _the
exact same place_. Being distributed, a Git repository doesn't need to be
hosted unless you're sharing it. You can publish it [easily][17] on any web
server, and RubyForge (which has always been the most popular place to host
Ruby projects) [supports git][18].

   [17]: http://www.kernel.org/pub/software/scm/git/docs/user-manual.html#setting-up-a-public-repository
   [18]: http://drnicwilliams.com/2008/04/08/git-for-rubyforge-accounts/

But after playing with it a bit I can see why everyone is choosing Github. For
one thing they got the project hosting part right, with a [simple clean
UI][19] and cool features like [an API][20] and [hooks for all kinds of
services][21].

   [19]: http://www.pjhyett.com/posts/232-why-github-will-overtake-sourceforge
   [20]: http://github.com/guides/the-github-api
   [21]: http://github.com/blog/105-services-galore

But the really cool thing about Github is that it provides [a social
environment][22]. You can watch projects as you'd expect, but you can also
follow people, send them messages, and easily send them pull requests (to
integrate changes you've made). It's great for discovering interesting and new
projects: just follow friends and people whose work you like to see what
they're watching, creating and forking.

   [22]: http://www.readwriteweb.com/archives/github_a_social_network_for_programmers.php

Now that [EC2 on Rails][23] is on Github it's more likely that other people
will want to build it themselves so I'll try to make that easier with a one-
step script at the root of the project. Feel free to fork it, implement
changes and send me patches or pull requests.

   [23]: http://pauldowman.com/projects/ruby-on-rails-ec2/

And [find me on Github][24]!

   [24]: http://github.com/pauldowman

