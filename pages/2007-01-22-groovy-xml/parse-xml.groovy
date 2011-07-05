def slideShow = new XmlSlurper().parse("http://java.sun.com/webservices/jaxp/dist/1.1/docs/tutorial/dom/samples/slideSample01.xml")

println("slideshow author attribute: ${slideShow['@author']}")

def slides = slideShow.slide
for (slide in slides) {
    println("slide title element: " + slide.title)
    for (item in slide.item) {
        println("  item text: ${item}")
    }
}
