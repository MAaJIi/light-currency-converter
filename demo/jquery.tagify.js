
/* Author: Alicia Liu */

(function ($) {
	
	$.widget("ui.tagify", {
		options: {
			delimiters: [13, 188, 44],          // what user can type to complete a tag in char codes: [enter], [comma]
			outputDelimiter: ',',           // delimiter for tags in original input field
			cssClass: 'tagify-container',   // CSS class to style the tagify div and tags, see stylesheet
			addTagPrompt: 'add tags',       // placeholder text
			addTagOnBlur: false				// Add a tag on blur when not empty
		},
		
		_create: function() {
			var self = this,
				el = self.element,
				opts = self.options;

			this.tags = [];
			
			// hide text field and replace with a div that contains it's own input field for entering tags
			this.tagInput = $("<input type='text'>")
				.attr( 'placeholder', opts.addTagPrompt )
				.keypress( function(e) {
					var $this = $(this),
					    pressed = e.which;

					for ( i in opts.delimiters ) {
						
						if (pressed == opts.delimiters[i]) {
							self.add( $this.val() );
							e.preventDefault(); 
							return false;
						}
					}
				})
				// we record the value of the textfield before the key is pressed
				// so that we get rid of the backspace issue
				.keydown(function(e){
					self.keyDownValue = $(this).val();
				})
				// for some reason, in Safari, backspace is only recognized on keyup
				.keyup( function(e) {
					var $this = $(this),
					    pressed = e.which;

					// if backspace is hit with no input, remove the last tag
					if (pressed == 8) { // backspace
						if ( self.keyDownValue == '' ) {
							self.remove();
							return false;
						}
						return;
					}
				});
			
			// Add tags blur event when required	
			if (opts.addTagOnBlur) {
				// When needed, add tags on blur
				this.tagInput.blur( function(e) {
					var $this = $(this);