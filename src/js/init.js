/*content enabled*/
var $body = $('body'),
	$preloader = $('body .preloader'),
	w1, w2,
	resize = function(e){
		w1 = $body.outerWidth(true);
		$body.addClass('load');
		w2 = $body.outerWidth(true);
		if(w1 != w2) {
			$body.css('marginRight', (w2 - w1) + 'px');
		}
	};
resize();
$(window).on('resize.comingsoon', resize);

$(window).on('load', function(){
	//$body.addClass('load');
	setTimeout(function(){
		$preloader.animate({
			opacity: 0
		}, 1500, function(){
			$(window).unbind('resize.comingsoon');
			$preloader.hide();
			$body.removeClass('load').removeAttr('style');
		});
	}, 4000);
});