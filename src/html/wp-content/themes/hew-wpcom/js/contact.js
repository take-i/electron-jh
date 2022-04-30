/**
 * contact.js
 */
;(function($){
	//Custom Checkbox
	function custom_checkbox(){
		var $self = $(this);
		var $parent = $self.parents('.js_checkbox');
		var class_checked = 'is_checked';
		if($self.prop('checked')){
			$parent.addClass(class_checked);
		} else {
			$parent.removeClass(class_checked);
		}
	}
	$('.js_checkbox').each(function(e){
		var $self = $(this);
		var $target = $self.find('#' + $self.attr('for'));

		if($target.length){
			$target.on('change.checked', custom_checkbox);
		}
		$target.trigger('change.checked');
	});

	document.addEventListener( 'wpcf7mailsent', function(event){
		$('html,body').animate({ scrollTop: 0 }, 1000, 'easeInOutCubic');
	}, false );
})(jQuery);