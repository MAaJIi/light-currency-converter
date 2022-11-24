
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
