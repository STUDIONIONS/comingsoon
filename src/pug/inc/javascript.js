var time = (new Date()).getTime();
yepnope('/assets/templates/comingsoon/js/appjs.js?'+time, undefined, function() {
	yepnope.injectCss('https://fonts.googleapis.com/css?family=Noto+Sans:400,700&subset=cyrillic');
	yepnope('/assets/templates/comingsoon/js/main.js?'+time, undefined, function() {})
})