const webpackConfig = require('./webpack.config');

module.exports = function gruntHandler(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		eslint: {
			target: [
				'Gruntfile.js',
				'webpack.config.js',
				'src/**/*.js',
				'test/**/*.js'
			]
		},

		kevoree: {
			main: {
				options: {
                    runtime: 'next',
					localModel: 'kevlib.json'
				}
			}
		},

		kevoree_genmodel: {
			main: {
				options: {}
			}
		},

		kevoree_registry: {
			main: {
				src: 'kevlib.json',
				options: {}
			}
		},

		webpack: {
			main: webpackConfig
		}
	});

	grunt.registerTask('default', 'build');
	grunt.registerTask('build', ['kevoree_genmodel', 'webpack']);
	grunt.registerTask('kev', ['build', 'kevoree']);
	grunt.registerTask('publish', ['build', 'kevoree_registry']);
};
