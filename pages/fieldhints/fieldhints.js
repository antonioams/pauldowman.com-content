/*-------------------------------------------------------------------------
 *    FieldHints version 1.0
 *    http://pauldowman.com/projects/fieldhints
 *
 *    Copyright 2007 Paul Dowman, http://pauldowman.com/
 *
 *    FieldHints is free software; you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation; either version 2 of the License, or
 *    (at your option) any later version.
 *
 *    FieldHints is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *    
 *--------------------------------------------------------------------------
 *  
 *  This script requires the Prototype JavaScript library:
 *  http://prototypejs.org
 *
 *--------------------------------------------------------------------------*/


var FieldHints = {
    
    fieldWithHintClass: 'fieldWithHint',
    labelClass: 'hintText',

    initialize: function() {
        var labels = $$('label.hintText')
        var f = FieldHints.initializeField.bind(FieldHints)
        labels.each(f)
    },
    
    // Registers a blur handler and a focus handler for the field, and adds a
    // submit handler to a chain of submit handlers for the form.
    initializeField: function(label) {
        var fieldId = label.htmlFor
        if (!fieldId) return;

        var field = $(fieldId)
        if (!field) return;
            
        if (!field.fieldHintsInitialized) {
            field.fieldHintsInitialized = true
            var hint = label.innerHTML.strip()
            var form = field.form
            
            this.addFocusHandler(field, hint)
            this.addBlurHandler(field, hint)
            
            var oldSubmitHandler
            if (form.onsubmit) oldSubmitHandler = form.onsubmit.bind(form)
            field.form.onsubmit = this.hintSubmitHandler(hint, field, oldSubmitHandler)
            
            field.onblur()
        }
        
    },
    
    addFocusHandler: function(field, hint) {
        if (field.onfocus) {
            field.fieldHintsOldFocusHandler = field.onfocus.bind(field)
        }
        field.onfocus = function() {
            if (this.value == hint) {
                this.value = ''
                $(this).removeClassName(FieldHints.fieldWithHintClass)
            }
            if (this.fieldHintsOldFocusHandler) this.fieldHintsOldFocusHandler()
        }
    },
    
    addBlurHandler: function(field, hint) {
        if (field.onblur) {
            field.fieldHintsOldBlurHandler = field.onblur.bind(field)
        }
        field.onblur = function() {
            if (this.value == '') {
                this.value = hint
            }
            // need a separate if here because firefox sets the field text
            // to the previously entered value if page is reloaded
            if (this.value == hint) {
                $(this).addClassName(FieldHints.fieldWithHintClass)
            }
            if (this.fieldHintsOldBlurHandler) this.fieldHintsOldBlurHandler()
        }
    },
    
    // If the field never received focus then it will still have the hint text
    // in it. In that case it should be empty on submit, instead of submitting
    // the hint text, so register a submit handler for the form. There may
    // already be a submit handler on the form, so we need to keep a reference
    // to it and call it at the end.
    hintSubmitHandler: function(hint, field, oldSubmitHandler) {
        return function() {
            if (field.value == hint) {
                field.value = ''
                $(this).removeClassName(FieldHints.fieldWithHintClass)
            }
            if (oldSubmitHandler) {
                try {
                    var retval = oldSubmitHandler()
                } catch (error) {
                    console.log("Caught exception from old submit handler: "+error)
                    return false;
                }
                return retval
            } else {
                return true
            }
        }
    }
    
}


