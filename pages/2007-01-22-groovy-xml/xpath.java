XPath xpath = XPathFactory.newInstance().newXPath();

String expression = "/slideshow/slide[title = 'Overview']";
Node overview = (Node) xpath.evaluate(expression, document, XPathConstants.NODE);
