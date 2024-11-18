module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var pugMinify = false,
		optionsPug = {
			pretty: !pugMinify ? '\t' : '',
			separator:  !pugMinify ? '\n' : ''
		},
		tasksConfig = {
			pkg: grunt.file.readJSON("package.json"),
			meta: {
				banners: "/**!\n * <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %>\n**/"
			},
			uglify: {
				compile: {
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
								'assets/templates/comingsoon/js/main.js'
							],
							dest: 'assets/templates/comingsoon/js/',
							filter: 'isFile',
							rename: function (dst, src) {
								// To keep the source js files and make new files as `*.min.js`:
								return dst + '/' + src.replace('.js', '.min.js');
							}
						},
						{
							expand: true,
							flatten : true,
							src: [
								'test/js/appjs.js'
							],
							dest: 'assets/templates/comingsoon/js/',
							filter: 'isFile',
							rename: function (dst, src) {
								// To keep the source js files and make new files as `*.min.js`:
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
						plugins: [
							new (require('less-plugin-clean-css'))({
								level: {
									1: {
										specialComments: 0
									}
								}
							})
						],
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
						'tests/css/main.css' : ['test/css/main.css']
					}
				},
			},
			concat: {
				options: {
					separator: "\n",
				},
				dist: {
					src: [
						'tests/css/main.css'
					],
					dest: 'assets/templates/comingsoon/css/main.css',
				},
				appjs: {
					src: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery.transform.js/jquery.transform2d.js'
					],
					dest: 'test/js/appjs.js'
				},
				main: {
					src: [
						'src/js/clock.js'
					],
					dest: 'assets/templates/comingsoon/js/main.js'
				}
			},
			copy: {
				fonts: {
					expand: true,
					cwd: 'src/fonts',
					src: [
						'**.*'
					],
					dest: 'assets/templates/comingsoon/fonts/',
				}
				
			},
			pug: {
				files: {
					options: optionsPug,
					files: {
						"index.html": ['src/pug/index.pug'],
						"assets/templates/comingsoon/index.html": ['src/pug/index.pug']
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
							dest: 'assets/templates/comingsoon/images/',
							filter: 'isFile'
						}
					]
				}
			},
			delta: {
				options: {
					livereload: true,
				},
				compile: {
					files: [
						'src/**/*.*'
					],
					tasks: [
						'imagemin',
						'less',
						'autoprefixer',
						'concat',
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