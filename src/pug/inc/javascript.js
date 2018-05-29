var time = (new Date()).getTime();
window.clockDesign = {
	//background: '/assets/templates/comingsoon/images/clock-bg.png',
	background: '/assets/templates/comingsoon/images/pixel.png',
	glass: '/assets/templates/comingsoon/images/glass.png',
	clock: '/assets/templates/comingsoon/images/clock.png',
	hour: '/assets/templates/comingsoon/images/hour.png',
	minute: '/assets/templates/comingsoon/images/minute.png',
	secondcolor: '#fff'
};
yepnope('/assets/templates/comingsoon/js/appjs.js?'+time, undefined, function() {
	yepnope.injectCss('https://fonts.googleapis.com/css?family=Noto+Sans:400,700&subset=cyrillic');
	yepnope('/assets/templates/comingsoon/js/main.js?'+time, undefined, function() {
		$('.page').css({
			//'backgroundImage' : "url('/assets/templates/comingsoon/images/1.jpg')"
			'backgroundImage' : "url('/assets/templates/comingsoon/images/projectsoft.jpg')"
		});
	})
})