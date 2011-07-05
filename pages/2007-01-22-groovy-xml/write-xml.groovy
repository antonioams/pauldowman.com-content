def doc = new StreamingMarkupBuilder().bind {

  slideshow(title:"Sample Slide Show", date:"Date of publication", author:"Yours Truly") {
      slide(type:"all") {
          title("Wake up to WonderWidgets!")
      }
      slide(type:"all") {
          title("Overview")
          item("item") {
              mkp.yield("Why ")
              em("WonderWidgets")
              mkp.yield(" are great")
          }
          item()
          item("item") {
              mkp.yield("Who ")
              em("buys")
              mkp.yield(" WonderWidgets")
          }
      }

      mkp.yield("normal text here")
  }
}

System.out << doc
