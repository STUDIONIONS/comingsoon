
// Clock Plugin
(function($){
	var Clock = function(element){
		
		$.extend(Clock.prototype, {
			init: function(){
				var self = this;
				self.interval = setInterval(self.ticktack.bind(self), 50);
			},
			ticktack: function(){
				var self = this,
					date = new Date(),
					hour = date.getHours() % 12,
					minute = date.getMinutes(),
					second = date.getSeconds(),
					milisecond = date.getMilliseconds(),
					rotateHour = ((hour * 360) / 12) + ((minute * 30) / 60),
					rotateMinute = ((minute * 360) / 60) + ((second * 6) / 60),
					roteteSecond = ((second * 360) / 60) + ((milisecond * 6) / 1000);
				self.hour.css({
					'transform': 'rotate('+rotateHour+'deg)'
				});
				self.minute.css({
					'transform': 'rotate('+rotateMinute+'deg)'
				});
				self.second.css({
					'transform': 'rotate('+roteteSecond+'deg)'
				});
			}
		});
		
		this.element = element;
		this.interval = null;
		$(this.element).css({
			backgroundImage: 'url(' + window.clockDesign.background + ')'
		});
		this.glass = $(".glass", this.element);
		this.background = $(".background", this.element);
		this.hour = $(".hour", this.element);
		this.minute = $(".minute", this.element);
		this.second = $(".minute", this.second);
		/*
		this.glass = $("<div></div>", {
			'class': 'glass'
		}).css({
			backgroundImage: 'url(' + window.clockDesign.glass + ')'
		});
		this.background = $("<div></div>", {
			'class': 'background'
		}).css({
			backgroundImage: 'url(' + window.clockDesign.clock + ')'
		});
		this.hour = $("<div></div>", {
			'class': 'hour',
		}).css({
			backgroundImage: 'url(' + window.clockDesign.hour + ')'
		});
		this.minute = $("<div></div>", {
			'class': 'minute',
		}).css({
			backgroundImage: 'url(' + window.clockDesign.minute + ')'
		});
		this.second = $("<div></div>", {
			'class': 'second',
		}).css({
			borderColor: window.clockDesign.secondcolor
		});
		*/
		$(this.element).append([this.background, this.hour, this.minute, this.second, this.glass]);
		this.init();
	};
	/*Clock.prototype.init = function(){
		var self = this;
		self.interval = setInterval(self.ticktack.bind(self), 50);
	};
	Clock.prototype.ticktack = function(){
		var self = this,
			date = new Date(),
			hour = date.getHours() % 12,
			minute = date.getMinutes(),
			second = date.getSeconds(),
			milisecond = date.getMilliseconds(),
			rotateHour = ((hour * 360) / 12) + ((minute * 30) / 60),
			rotateMinute = ((minute * 360) / 60) + ((second * 6) / 60),
			roteteSecond = ((second * 360) / 60) + ((milisecond * 6) / 1000);
			self.hour.css({
				'transform': 'rotate('+rotateHour+'deg)'
			});
			self.minute.css({
				'transform': 'rotate('+rotateMinute+'deg)'
			});
			self.second.css({
				'transform': 'rotate('+roteteSecond+'deg)'
			});
		
	};*/
	
	function Plugin(){
		return this.each(function(){
			var $this = $(this),
			data = $this.data('plugin.clock');
			if(!data){
				$this.data('plugin.clock', (data = new Clock(this)));
			}
		});
	}
	
	var old = $.fn.clock;
	
	$.fn.clock = Plugin;
	$.fn.clock.Constructor = Clock;
	
	$.fn.clock.noConflict = function(){
		$.fn.clock = old;
		return this;
	};
	
	$(window).on('load', function () {
		$('[data-plugin="clock"]').each(function(){
			var $clock = $(this);
			Plugin.call($clock);
		});
	});
	
}(jQuery));

(function(window, document, $){
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
}(window, document, $));