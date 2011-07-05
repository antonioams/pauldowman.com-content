Java and XML are like peanut butter and chocolate, right? They just go
together, don't they? Jon Bosak of Sun summed it up most famously as "[XML
gives Java something to do][10]".

   [10]: http://www.ibiblio.org/pub/sun-info/standards/xml/why/xmlapps.htm

**XML gives Java developers something to do**  
I think I see Sun's master plan: the more work Java developers must do to
solve a given problem, the more of them we'll need to have. The more Java
developers we have, the more [popular][11] Java appears. (The only problem
left to solve is how to profit from that, but I digress). The key to this
plan's success is lack of [syntactic support][12] for XML, and the added bonus
is that even more developers will occupy their time building endless numbers
of libraries! "Why make trillions when we can make... BILLIONS?!" [:-)][13]

   [11]: http://www.dedasys.com/articles/language_popularity.html
   [12]: http://steve-yegge.blogspot.com/2006/09/bloggers-block-4-ruby-and-java-and.html
   [13]: http://en.wikipedia.org/wiki/Dr_Evil

There are some decent libraries for handling XML in Java, but most are quite
heavyweight, requiring you to create Java classes (in the case of the XML
binding variety) or at least a config file (XML-based, naturally!).

**There is another way**  
I've [written before][14] about using other languages with Java, and
[Groovy][15] has some really nice features for handling XML. Groovy compiles
to Java bytecode so you can write an XML handling class in Groovy and use it
within your Java app. Here's an example that uses Groovy's [GPath][16] to read
in [an XML file][17] from [Sun's XML DOM tutorial][18], and prints some of the
elements. Just for fun, we're loading the XML file directly by http:
    
   [14]: http://pauldowman.com/2006/11/17/javascript-on-the-jvm/
   [15]: http://groovy.codehaus.org/
   [16]: http://groovy.codehaus.org/GPath
   [17]: http://java.sun.com/webservices/jaxp/dist/1.1/docs/tutorial/dom/samples/slideSample01-xml.html
   [18]: http://java.sun.com/webservices/jaxp/dist/1.1/docs/tutorial/dom/1_read.html

{{parse-xml.groovy | code(groovy)}}

Here's the Java version as a comparison. Honestly, nobody really uses the DOM
API because it's so painful (hence the existence of so many libraries to do
the job), but this is the out-of-the-box Java way:

{{parse-xml.java | code(java)}}

I have omitted error handling.

Using XPath in Java can make our job easier when it comes to searching a tree
for a node (you wouldn't want to see this done with pure DOM manipulation!),
but we'll still still have to deal with an [org.w3c.dom.Node][19] object that
is the result:
    
   [19]: http://java.sun.com/j2se/1.5.0/docs/api/org/w3c/dom/Node.html

{{xpath.java | code(java)}}

Here's the same thing done in Groovy, a simple one-liner:
    
{{xpath.groovy | code(groovy)}}

Two interesting things here are the use of a [closure][20], and the use of ==
which might look wrong to a sharp-eyed Java programmer. Groovy uses == for
equality and the method is() to test for identity. This is the opposite of
Java but leads to more readable code because typically we compare for equality
much more often than identity. And == works with null in Groovy, so your
typical Java comparison (x != null && x.equals(y)) becomes x == y in Groovy,
which looks more like what we mean.

   [20]: http://groovy.codehaus.org/Closures

Creating XML is also easy in Groovy using [MarkupBuilder][21], here is the
code to create our [sample XML file][22]:

    
   [21]: http://groovy.codehaus.org/Creating+XML+using+Groovy%27s+MarkupBuilder
   [22]: http://java.sun.com/webservices/jaxp/dist/1.1/docs/tutorial/dom/samples/slideSample01-xml.html

{{write-xml.groovy | code(groovy)}}

It's easy to read because it has a visually similar structure to the XML that
it's creating, and the syntax is quite terse. Groovy has similar builders for
other things besides XML, for example to create [SWT][23] and [Swing][24]
UI's. You can even [create your own][25]. More on how this is implemented
coming soon...

   [23]: http://groovy.codehaus.org/GroovySWT
   [24]: http://www.oreillynet.com/onjava/blog/2004/10/gdgroovy_basic_swingbuilder.html
   [25]: http://groovy.codehaus.org/Make+a+builder

There are other choices besides Groovy, of course, I haven't tried it yet but
[Scala][26] looks like it [might be a good choice][27]. (For that matter there
are [other][28] [choices][29] besides XML!)

   [26]: http://scala.epfl.ch/
   [27]: http://lamp.epfl.ch/~emir/written/emirlncs4028.pdf
   [28]: http://www.yaml.org/
   [29]: http://www-128.ibm.com/developerworks/xml/library/x-syntax.html?loc=x

