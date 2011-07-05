When I was [moving EC2 on Rails to Git][10] I found several posts that
explained how to convert a repo from svn to Git. But none of them included
converting your svn tags to Git tags, so here's yet another how-to guide. (Git
experts please comment if I'm doing anything dumb.)

   [10]: http://pauldowman.com/2008/07/26/got-git/

#### 1. Install Git

First, you'll need Git installed with [git-svn][11] included (git-svn will
actually allow you to push changes back to the original Subversion repository,
but for our purposes we're assuming that this is a one-time conversion).

   [11]: http://www.kernel.org/pub/software/scm/git/docs/git-svn.html

If you're using OS X you should already be using [MacPorts][12], so just do:
    
   [12]: http://www.macports.org/

    prompt> sudo port install git-core +svn

_UPDATE 2010: I recommend [Homebrew](http://mxcl.github.com/homebrew/) instead of MacPorts_

Or, on Ubuntu or Debian Linux:
    
    prompt> sudo apt-get install git-svn

#### 2. Create the authors file

Next, create a text file that maps Subversion committers to Git authors so the
names and email addresses will be correct in the history. Save it as
authors.txt:
    
{{authors.txt | code(text)}}

#### 3. Clone the repository

Now run the command that will import your svn repo into a local Git repo. I'm
assuming your svn repo had the standard layout of /trunk, /tags and /branches.
    
    prompt> git svn clone <svn repo url> --no-metadata -A authors.txt -t tags -b branches -T trunk <destination dir name>

Now running `git log` should show all your commit history with the correct
authors.

#### 4. Convert branches to tags

There's one more thing. All your tags are now remote branches, not tags, in
your Git repo. So you'll need to convert them manually (or write a script to
do it if you have a lot, I'll leave that as an exercise for the reader). For
each Subversion tag (i.e. Git remote branch) you'll add it as a Git tag, then
delete the remote branch. List them with:
    
    prompt> git branch -r

Then for each tag listed do:
    
    prompt> git tag tagname tags/tagname
    prompt> git branch -r -d tags/tagname

You now have a local Git repository with all your history and tags. If you
don't need to share it with anyone else then you're done.

#### 5. Push to a public repo (optional)

If you want to publish to a public repository (for example [Github][14]),
you'll need to add it as a remote repo and then push to it.
    
   [14]: http://github.com

    prompt> git remote add origin git@github.com:userid/project.git
    prompt> git push origin master --tags

You next stop should probably be the [Git tutorial for Subversion users][15].
Enjoy!

   [15]: http://git.or.cz/course/svn.html

