DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
URL url = new URL("http://java.sun.com/webservices/jaxp/dist/1.1/docs/tutorial/dom/samples/slideSample01.xml");
InputStream stream = url.openStream();
DocumentBuilder builder = factory.newDocumentBuilder();
Document document = builder.parse(stream);

Element rootElement = document.getDocumentElement();
String author = rootElement.getAttribute("author");
System.out.println("slideshow author attribute: " + author);

NodeList slides = rootElement.getChildNodes();

for (int i = 0; i < slides.getLength(); i++) {
    if (slides.item(i).getNodeType() == Node.ELEMENT_NODE) {
        Node slide = slides.item(i);
        NodeList slideChildren = slide.getChildNodes();
        for (int j = 0; j < slideChildren.getLength(); j++) {
            Node child = slideChildren.item(j);
            if (child.getNodeType() == Node.ELEMENT_NODE) {
                if (child.getNodeName().equals("title")) {
                    System.out.println("slide title element: "
                            + child.getTextContent());
                } else if (child.getNodeName().equals("item")) {
                    System.out.println("  item text: "
                            + child.getTextContent());
                }
            }
        }
    }
}
