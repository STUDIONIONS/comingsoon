'use strict';
const application = function(params) {
	let self = this
	let index = 0;
	let canvas;
	let ctx;
	let elements = {
		images: [],
		defaultImages: [],
		text: null,
		filterLayer: []
	};
	let movedObject = null;
	let bgcolor = params.bgcolor;
	let fontfamily = params.fontfamily;
	let fontweight = params.fontweight;
	let linewidth = params.linewidth;
	let pixabayResults = [];

	function ge(elem) {
		let el;
		if(el = document.querySelector(elem)){
			return el;
		}
		throw "Невыбран элемент: " + elem;
	}

	function getCanvas() {
		canvas = ge(params.canvas);
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		ctx = canvas.getContext('2d');
	}

	function bindings() {
		ge(".image_src_input").addEventListener('change', function(e) {
			console.log(e.target.files);
			if (e.target.files.length > 0) {
				let URL = window.webkitURL || window.URL;
				let img = new Image();
				img.src = URL.createObjectURL(e.target.files[0])
				let _img = [];
				_img.image = img;
				_img.x = 0;
				_img.y = 0;
				_img.pressX = 0;
				_img.pressY = 0;
				img.onload = function() {
					_img.width = img.width;
					_img.height = img.height;
					elements.images[0] = _img;
				}
			}
		});
		ge('.btn_loadimage').addEventListener('click', function() {
			ge('.image_src_input').click();
		});
		ge('.input_select_bgcolor').addEventListener('input', function(e) {
			bgcolor = this.value;
		});
		ge('.post_text').addEventListener('input', function() {
			elements.text.txt = this.value;
		});
		ge('.input_select_textcolor').addEventListener('input', function() {
			elements.text.textcolor = this.value;
		})
		ge('.input_select_textoutline').addEventListener('input', function() {
			elements.text.textoutline = this.value;
		})
		ge('.input_select_linewidth').addEventListener('input', function() {
			elements.text.linewidth = this.value;
		})
		ge('.input_fontsize').addEventListener('change', function() {
			elements.text.fonsize = this.value;
		});
		ge('.input_overlay_alpha').addEventListener('input', function() {
			elements.filterLayer.alpha = this.value;
		});
		ge('.input_select_fontweight').addEventListener('input', function() {
			elements.text.fontweight = this.value;
		});
		ge('.input_select_font_family').addEventListener('input', function() {
			elements.text.fontfamily = this.value;
		});
	}

	function loadfonts() {
		if (params.fonts.length > 0) {
			params.fonts.forEach(tmpFont => {
				let f = new FontFace(tmpFont.name, tmpFont.url, {
					style: tmpFont.style,
					weight: tmpFont.weight
				});
				f.load().then(function(font) {
					document.fonts.add(font);
					let opt,
						options = [...ge('.input_select_font_family').querySelectorAll('option')],
						result = options.find(item => item.value == tmpFont.name);
					!result && (
						opt = document.createElement('option'),
						opt.textContent = opt.value = tmpFont.name,
						ge('.input_select_font_family').append(opt),
						ge('.input_select_font_family').value = fontfamily
					);
				});
			});
		}
	}
	this.start = function() {
		getCanvas(params);
		bindings();
		loadfonts();
		let _text = [];
		_text.txt = ge('.post_text').value;
		_text.x = 0;
		_text.y = canvas.height / 2 - 15
		_text.pressX = 0;
		_text.pressY = 0;
		_text.linewidth = linewidth;
		_text.textcolor = '#fff';
		_text.textoutline = '#000';
		_text.fonsize = '26';
		_text.fontfamily = fontfamily;
		_text.fontweight = fontweight;
		elements.text = _text;
		/*let img = new Image();
		img.src = params.logo;
		let _img = [];
		_img.image = img;
		_img.width = 113;
		_img.height = 19;
		_img.x = 20;
		_img.y = 20;
		_img.pressX = 0;
		_img.pressY = 0;
		elements.defaultImages.push(_img);*/
		let _fltr = [];
		_fltr.alpha = 0.2;
		_fltr.color = "#000000";
		elements.filterLayer = _fltr;
		gameLoop();
		loadActions();


	}

	function drawImage(img) {
		let ratioX = canvas.width / img.width;
		if (ratioX < 1) {
			ctx.drawImage(img.image, img.x, img.y, img.width * ratioX, img.height * ratioX);
		} else {
			ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
		}
	}

	function drawText(elem) {
		let txt = elem.txt;
		let lines = getLines(txt, canvas.width - 40);
		let lineheight = 0;
		let startposition = elem.y;
		let eStartX = [];
		let eMaxX = [];
		let elementHeight = 0;
		lines.forEach(line => {
			ctx.font = elem.fontweight + " " + elem.fonsize + "px " + elem.fontfamily;
			lineheight = lineheight + parseInt(elem.fonsize) * 1.2;
			ctx.textAlign = "left";
			ctx.fillStyle = elem.textcolor;
			let txt_width = parseInt(ctx.measureText(line).width);
			let _elementX = (canvas.width / 2) - (txt_width / 2);
			elementHeight = elementHeight + lineheight;
			eStartX.push(parseInt(_elementX));
			eMaxX.push((canvas.width / 2) + txt_width / 2);
			ctx.lineWidth = elem.linewidth;
			ctx.miterLimit = 3;
			ctx.lineJoin = 'circle';
			ctx.strokeStyle = elem.textoutline;
			ctx.strokeText(line, _elementX, startposition + lineheight);
			ctx.lineWidth = 0;
			ctx.fillText(line, _elementX, startposition + lineheight);
		});
		let minX = eStartX.sort(function(a, b) { return a - b; });
		let maxX = eMaxX.sort(function(a, b) { return a - b; });
		elements.text.x = minX[0];
		elements.text.width = maxX[0];
		elements.text.height = elementHeight;
	}

	function getLines(text, maxWidth) {
		let words = text.split(/\r\n|\n/g);
		let lines = [];
		let currentLine = words[0];
		for (var i = 0; i < words.length; i++) {
			let word = words[i];
			lines.push(words[i]);
		}
		return lines;
	}

	function drawElements() {
		ctx.fillStyle = bgcolor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (elements.images.length > 0) {
			elements.images.forEach(element => {
				drawImage(element);
			});
		}
		ctx.fillStyle = elements.filterLayer.color; //elements.filterLayer.color;
		ctx.globalAlpha = elements.filterLayer.alpha;
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		ctx.globalAlpha = 1;
		if (elements.text) {
			drawText(elements.text);
		}
		if (elements.defaultImages.length > 0) {
			elements.defaultImages.forEach(element => {
				drawImage(element);
			});
		}


	}

	function intersect(object) {
		let mouseX = event.layerX;
		let mouseY = event.layerY;
		let elementX1 = object.x;
		let elementY1 = object.y;
		let elementX2 = object.x + object.width;
		let elementY2 = object.y + object.height;
		if (mouseX >= elementX1 && mouseX <= elementX2 && mouseY >= elementY1 && mouseY <= elementY2) {
			return true;
		} else {
			return false;
		}
	}

	function loadActions() {
		canvas.onmouseup = function() {
			movedObject = null
		};
		canvas.onmousedown = function(e) {
			elements.images.forEach(element => {
				if (intersect(element)) {
					movedObject = element;
					movedObject.pressX = e.offsetX - element.x;
					movedObject.pressY = e.offsetY - element.y;
				}
			});

			elements.defaultImages.forEach(element => {
				if (intersect(element)) {
					movedObject = element;
					movedObject.pressX = e.offsetX - element.x;
					movedObject.pressY = e.offsetY - element.y;
				}
			});
			if (intersect(elements.text)) {
				movedObject = elements.text;
				movedObject.pressX = e.offsetX - elements.text.x;
				movedObject.pressY = e.offsetY - elements.text.y;
			}
		};
	}

	function gameLoop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.onmousemove = function(e) {
			if (movedObject) {
				movedObject.x = e.layerX - movedObject.pressX;
				movedObject.y = e.layerY - movedObject.pressY;
			}
		};
		drawElements();
		requestAnimationFrame(gameLoop);
	}
	
	ge('.download').addEventListener('click', function(e) {
		++index;
		let file = ("0000" + index).slice(-4);
		let canvasUrl = canvas.toDataURL("image/jpeg");
		let createEl = document.createElement('a');
		createEl.href = canvasUrl;
		createEl.download = "poster-" + file + ".jpg";
		createEl.click();
		createEl.remove();
	});
};