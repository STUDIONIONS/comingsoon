	<link rel="stylesheet" href="<?= MODX_SITE_URL ?><?= $this->path ?>css/main.min.css">
	<div class="container">
		<h1 class="text-center">
			<i class="fa fa-image"></i>Генератор Open Graph Image
		</h1>
		<div class="app" id="app">
			<div class="canvas_overlay"><canvas class="cnvs" width="510" height="300"></canvas></div>
			<div class="tools_overlay">
				<div class="btn_container">
					<textarea class="input post_text" placeholder="Текст поста" cols="30" rows="3">Текст и лого можно двигать</textarea>
				</div>
				<h2 class="text-center">Шрифт</h2>
				<div>
					<div class="btn_container">
						<div>
							<span>Имя</span>
							<select class="input_select_font_family"></select>
						</div>
						<div>
							<span>Стиль</span>
							<select class="input_select_fontweight">
								<option value="normal" selected>Regular</option>
								<option value="bold">Bold</option>
							</select>
						</div>
						<div>
							<span>Размер</span>
							<select class="input_fontsize">
								<option value="18">18</option>
								<option value="22">22</option>
								<option value="26" selected>26</option>
								<option value="30" >30</option>
								<option value="32">32</option>
								<option value="36">36</option>
							</select>
						</div>
					</div>
					<div class="btn_container">
						<div>
							<span>Цвет</span>
							<input value="#ffffff" class="input input_color input_select_textcolor" type="color">
						</div>
						<div>
							<span>Тень</span>
							<input class="input input_color input_select_textoutline" type="color" value="#000000">
						</div>
						<div>
							<span>Обводка</span>
							<input type="range" value="4" min="0" max="20" step="1" class="input_select_linewidth">
						</div>
					</div>
				</div>
				<h2 class="text-center">Фото</h2>
				<div class="btn_container">
					<div>
						<button class="btn btn_green btn_loadimage">Загрузить фото</button>
					</div>
					<div>
						<span>Фон:</span><input class="input input_color input_select_bgcolor" type="color">
					</div>
					<div>
						<span>Затенить:</span>
						<input type="range" value="0.2" min="0" max="1" step="0.01" class="input_overlay_alpha">
					</div>
				</div>
				<div class="btn_container">
					<div class="flex-column-center">
						<button class="btn btn_green download">Сохранить на компьютер</button>
					</div>
				</div>
				<div id="pixabay_wrapper" class="pixabay_wrapper"></div>
				<input class="hidden image_src_input" type="file" accept="image/png,image/jpeg">
			</div>
		</div>
	</div>

	<script src="<?= MODX_SITE_URL ?><?= $this->path ?>js/editor.js"></script>
	<script>
		var params = {
			canvas: 'canvas.cnvs',
			width: 510,
			height: 228,
			bgcolor: '#444444',
			fontfamily: 'Calibri',//"PT Sans",
			fontweight: 'normal',
			linewidth: 4,
			fonts: [
				{
					name: 'Calibri',
					url: 'url(<?= MODX_SITE_URL ?><?= $this->path ?>fonts/Calibri-Regular.ttf)',
					style: 'normal',
					weight: '400'
				},
				{
					name: 'Calibri',
					url: 'url(<?= MODX_SITE_URL ?><?= $this->path ?>fonts/Calibri-Bold.ttf)',
					style: 'normal',
					weight: '700'
				},
				{
					name: 'PT Sans',
					url: 'url(<?= MODX_SITE_URL ?><?= $this->path ?>fonts/PTSans-Regular.ttf)',
					style: 'normal',
					weight: '400'
				},
				{
					name: 'PT Sans',
					url: 'url(<?= MODX_SITE_URL ?><?= $this->path ?>fonts/PTSans-Bold.ttf)',
					style: 'normal',
					weight: '700'
				},
				{
					name: 'Oswald',
					url: 'url(<?= MODX_SITE_URL ?><?= $this->path ?>fonts/Oswald-Regular.ttf)',
					style: 'normal',
					weight: '400'
				}
			]
		};
		var app = new application(params);
		app.start();
	</script>