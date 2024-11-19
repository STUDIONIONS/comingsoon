module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var pugMinify = false,
		hash = (new Date()).getTime(),
		optionsPug = {
			pretty: !pugMinify ? '\t' : '',
			separator:  !pugMinify ? '\n' : '',
			data: function(dest, src) {
				return {
					"base": "[(site_url)]",
					"hash": hash,
				}
			}
		},
		tasksConfig = {
			pkg: grunt.file.readJSON("package.json"),
			meta: {
				banners: ""
			},
			uglify: {
				main: {
					options: {
						banner: '<%= meta.banners %>',
						sourceMap: false,
						compress: true
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'site/assets/templates/comingsoon/js/main.js'
							],
							dest: 'site/assets/templates/comingsoon/js/',
							filter: 'isFile',
							rename: function (dst, src) {
								return dst + '/' + src.replace('.js', '.min.js');
							}
						}
					]
				},
				app: {
					options: {
						sourceMap: false,
						compress: true
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'site/assets/templates/comingsoon/js/appjs.js'
							],
							dest: 'site/assets/templates/comingsoon/js/',
							filter: 'isFile',
							rename: function (dst, src) {
								return dst + '/' + src.replace('.js', '.min.js');
							}
						}
					]
				}
			},
			jshint: {
				src: [
					'test/js/main.js'
				],
			},
			less: {
				demo: {
					files : {
						'test/css/main.css' : [
							'src/less/main.less'
						]
					},
					options : {
						compress: false,
						ieCompat: false,
						banner: '<%= meta.banners %>',
						modifyVars: {
							'hash': hash
						}
					}
				}
			},
			autoprefixer:{
				options: {
					browsers: ['last 2 versions', 'Android 4', 'ie 8', 'ie 9', 'Firefox >= 27', 'Opera >= 12.0', 'Safari >= 6'],
					cascade: true
				},
				css: {
					files: {
						'test/css/main.css' : ['test/css/main.css']
					}
				},
			},
			concat: {
				options: {
					separator: "\n",
				},
				dist: {
					src: [
						'test/css/main.css'
					],
					dest: 'site/assets/templates/comingsoon/css/main.css',
				},
				appjs: {
					src: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery.transform.js/jquery.transform2d.js'
					],
					dest: 'site/assets/templates/comingsoon/js/appjs.js'
				},
				main: {
					src: [
						'src/js/clock.js'
					],
					dest: 'site/assets/templates/comingsoon/js/main.js'
				}
			},
			cssmin: {
				target: {
					files: [
						{
							expand: true,
							cwd: 'site/assets/templates/comingsoon/css',
							src: ['*.css', '!*.min.css'],
							dest: 'site/assets/templates/comingsoon/css',
							ext: '.min.css'
						}
					]
				}
			},
			copy: {
				fonts: {
					expand: true,
					cwd: 'src/fonts',
					src: [
						'**.*'
					],
					dest: 'site/assets/templates/comingsoon/fonts/',
				}
				
			},
			pug: {
				files: {
					options: optionsPug,
					files: {
						"index.html": ['src/pug/index.pug'],
						"site/assets/templates/comingsoon/index.html": ['src/pug/index.pug']
					}
				}
			},
			imagemin: {
				compile: {
					options: {
						optimizationLevel: 7,
						svgoPlugins: [
							{
								removeViewBox: false
							}
						]
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'src/images/*.svg'
							],
							dest: 'src/pug/images/',
							filter: 'isFile'
						},
						{
							expand: true,
							flatten : true,
							src: [
								'src/images/*.{png,jpg}'
							],
							dest: 'site/assets/templates/comingsoon/images/',
							filter: 'isFile'
						}
					]
				}
			},
			delta: {
				compile: {
					files: [
						'src/**/*.*'
					],
					tasks: [
						'imagemin',
						'less',
						'autoprefixer',
						'concat',
						'cssmin',
						'copy',
						'jshint',
						'uglify',
						'pug',
					]
				}
			},
		};
	
	grunt.initConfig(tasksConfig);
	
	grunt.registerTask('default',	tasksConfig.delta.compile.tasks);
}