module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		browserify: {
			globals: {
				src: ['kevoree-library.js'],
				dest: 'browser/globals/kevoree-library.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('browser', ['browserify']);
};