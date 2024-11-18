<?php

return [
	'caption' => 'Coming Soon ⏳',
	'introtext' => 'Сайт в разработке',
	'settings' => [
		/* Цвет общего фона */
		'clock_size' => [
			'caption' => 'Максимальный размер часов',
			'type'  => 'number',
			'note'  => 'Максимальный размер часов',
			'default_text' => '320',
		],
		/* Цвет общего фона */
		'clock_page_bgcolor' => [
			'caption' => 'Цвет общего фона',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет общего фона',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет текста */
		'clock_page_color' => [
			'caption' => 'Цвет текста',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет текста',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет фона циферблата */
		'clock_color_clock' => [
			'caption' => 'Цвет фона циферблата',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет фона циферблата',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет циферблата */
		'clock_color_ciferblat' => [
			'caption' => 'Цвет циферблата',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет циферблата',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет часовой стрелки */
		'clock_color_hour' => [
			'caption' => 'Цвет часовой стрелки',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет часовой стрелки',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет минутной стрелки */
		'clock_color_minute' => [
			'caption' => 'Цвет минутной стрелки',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет минутной стрелки',
			'default_text' => 'rgba(255,255,266,1)',
		],
		/* Цвет секундной стрелки */
		'clock_color_second' => [
			'caption' => 'Цвет секундной стрелки',
			'type'  => 'custom_tv:rgbcolor',
			'note'  => 'Цвет секундной стрелки',
			'default_text' => 'rgba(255,255,266,1)',
		],
		'clock_page_bgimage' => [
			'caption' => 'Изображение фона',
			'type'  => 'image',
			'note'  => 'Изображение фона',
			'default_text' => 'assets/templates/comingsoon/images/default.jpg',
		],
	],
];