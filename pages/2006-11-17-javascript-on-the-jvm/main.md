JavaScript began life in 1996 as an embedded scripting language in the
Netscape browser. It was originally named LiveScript but was renamed at the
last minute, presumably to ride the coat-tails of Java which was growing fast
as a [client-side programming platform][10].

   [10]: http://en.wikipedia.org/wiki/Java_applet

Since then [many dialects][11] have been implemented on many different
platforms, including the ECMA-262 standard, but historically it's success has
mainly been on the client side, as a scripting language for UI elements. There
were some early attempts at using it on the server, including Netscape's
LiveWire scripting and Microsoft's (non-default) option for server-side
JScript in ASP pages, but I don't believe either of those were widely used.

   [11]: http://en.wikipedia.org/wiki/ECMAScript#Dialects

This seems to be changing lately though, and the release of [Java 6][12] makes
it official: it includes a [scripting API][13], and though the API aims to
stay relatively language neutral the default scripting engine is a slightly
modified version of [Rhino][14], the JavaScript engine.

   [12]: http://java.sun.com/javase/6/
   [13]: http://java.sun.com/developer/technicalArticles/J2SE/Desktop/scripting/
   [14]: http://www.mozilla.org/rhino/

So Sun is finally beginning to position Java the platform as being about the
JVM rather than the language, the approach that Microsoft took with .NET from
the start. Sun is simply trying to stay relevant amidst the growing shift to
dynamic languages. [Phobos][15] is a JavaScript-based server that is part of
Sun's [GlassFish][16] project, and one of its stated goals is to "appeal to
developers who, for a variety of reasons, are hard for Java EE to reach". But
it's a welcome change for Java developers who now have more language options
while still developing for the Java platform. "Don't worry boss, it's JEE".
:-P

   [15]: https://phobos.dev.java.net/
   [16]: https://glassfish.dev.java.net/

Java developers now have options for building [DSL][17]'s using
[metaprogramming][18], and for more [efficient declaration of complex
literals][19]. Just imagine how much cleaner and shorter your jUnit tests
would be if you set up your test fixtures like this:

   [17]: http://www.martinfowler.com/bliki/DomainSpecificLanguage.html
   [18]: http://ola-bini.blogspot.com/2006/09/ruby-metaprogramming-techniques.html
   [19]: http://steve-yegge.blogspot.com/2006/09/bloggers-block-4-ruby-and-java-and.html

    var expected = {firstName:"John", lastname:"Smith", salary: 80000}

That's JavaScript object literal syntax. [Try it][20].

   [20]: http://www.squarefree.com/shell/shell.html

Of course there are a variety of "scripting" languages available that can run
on the JVM, most have been around for a few years already. [Jython][21] (née
JPython) has been around since [1997(!)][22]. [Groovy][23] (though suffering
slightly from [infighting and controversy][24]) has been around since at least
2003. And Sun just [hired the two core JRuby developers][25]. (There are also
pre-compiled languages like [Scala][26]).

   [21]: http://www.jython.org/
   [22]: http://www.jython.org/Project/history.html
   [23]: http://groovy.codehaus.org/
   [24]: http://www.pyrasun.com/mike/mt/archives/2005/01/09/20.57.06/index.html
   [25]: http://headius.blogspot.com/2006/09/jruby-steps-into-sun.html
   [26]: http://scala.epfl.ch/

But JavaScript seems to be the one growing most quickly in popularity, partly
because it's shipped by default with Java 6, and partly because there is
appeal in using only one language; since we're forced to use JavaScript on the
client side we might as well use it on the server too. I think the latter is a
pretty weak reason though, it's good to have a working knowledge of several
languages and to use the right tool for the job. (When all you have is a
hammer...) Also, though it still lacks modularity, [new features][27] like array
comprehensions and destructuring assignment are bringing JavaScript more in
line with other scripting languages.

   [27]: http://developer.mozilla.org/en/docs/New_in_JavaScript_1.7

Or perhaps Java developers just like the name.

