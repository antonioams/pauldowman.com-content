**UPDATE June 3, 2009:** I recommend using Gianni Chiappetta's [hinttext][7] instead. It uses the CSS positioning method instead, and it's nicely done. We're using that at [GigPark][8] now, and it's working great (Gianni works at GigPark too). 

   [7]: http://github.com/gf3/hinttext
   [8]: http://www.gigpark.com/

**UPDATE June 29, 2008: **A better (and much simpler!) way to do this is by positioning the label over the field with CSS as [described in this article][9], I doubt I'll have the time to update FieldHints to this new techique in the near future but [here's a jQuery plugin][10] that does it.

   [9]: http://www.alistapart.com/articles/makingcompactformsmoreaccessible
   [10]: http://remysharp.com/2007/03/19/a-few-more-jquery-plugins-crop-labelover-and-pluck/#labelOver

You know those grey "hints", or example entries, that web form fields
sometimes have in them? The ones that disappear when you click into the field?
Here's a JavaScript library to add those to your forms with just one line of
HTML.

Download it here: {{fieldhints-11.zip | download}}


[Here's an example](fieldhints/example.html), try clicking in the fields.

It's simple to use, basically you just add a [label][12] for the field with a
CSS class of "hintText". The label text will be used as the field's hint text
instead of being displayed on the page. (Note that multiple labels are
allowed, so you can still have another normal label for the field).

    
   [12]: http://www.w3.org/TR/html401/interact/forms.html#edef-LABEL

{{form.html | code(html)}}

This degrades gracefully: browsers without CSS support, for example screen
readers, will display the text as a label associated with the field.

To make this magic work you include fieldhints.js, fieldhints.css (both
available in {{fieldhints-11.zip | download}}) and the [Prototype JavaScript library][14] (which is
already included by default in Ruby on Rails projects). You then call
FieldHints.initialize() (probably in the onload attribute of the html body).

   [14]: http://prototypejs.org/download

For details see the [source of the above example](fieldhints/example.html).

Supported browsers:

  * IE 6 or later
  * Firefox 1.5 or later
  * Safari 2.0 for OS X (earlier versions and Safari for Windows untested, please let me know if you try it!)

### Some technical details

#### Using with AJAX

The labels are only inserted into the fields when FieldHints.initialize() is
called (which is normally only done with the onload attribute of the html
body). This means that if a field is displayed without the page being
reloaded, e.g. by AJAX, you will need to explicitly call
FieldHints.initialize() after the page update completes. If you're using
Prototype to do your AJAX updates you can do this with the [onSuccess
callback][16].

   [16]: http://prototypejs.org/api/ajax/options

In Ruby on Rails just add a `:success` option to the `link_to_remote` call:

{{ajax_form.html.erb | code(ruby)}}    

Or, if you're using a Rails RJS template to do the update add this as the last
line:
    
{{template.rjs | code(ruby)}}

A less obtrusive way would be to register it with Prototype in a global script
that's called on every page, like this:

{{application.js | code(javascript)}}

#### Using with other JavaScript event handlers

FieldHints registers a focus handler and a blur handler for the input element,
and a submit handler for the form. But don't worry, if you already had any of
these handlers specified it's smart enough to keep a reference to the old
function and call it at the right time (bound to the correct context).
Basically it should just work.

#### Using with form.submit()

FieldHints registers a submit handler for the form to clear any hint text
before submitting the form. But beware that submit handlers are only called on
"user-submitted" forms, i.e. when the user clicks "submit" or presses enter in
a form field. If you call form.submit() directly the submit handler won't be
called, and any hint text that's left won't be cleared. **If you call
form.submit() you'll need to call form.onsubmit() first.**

Please let me know if you have any suggestions or if you find any bugs.

### Change log

#### Version 1.1 (29 June 2008)

  * {{fieldhints-11.zip | download}}
  * Use focus and blur handlers.
  * Added semicolons.

#### Version 1.0 (5 Sept 2007)

  * {{fieldhints-10.zip | download}}
  * Fixed a bug when using FieldHints on a form that's refreshed with AJAX, it was attempting to initialize a field that had already been initialized.

#### Version 0.2 (15 July 2007)

  * Initial release.

