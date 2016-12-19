'use strict';

const PROJECTS = [
	'chan/{local,remotews}',
	'comp/{consoleprinter,ticker,mqtt*}',
	'node/*',
	'group/{ws,remotews}'
];

module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('./grunt-exec')(grunt);

	grunt.initConfig({
		exec: {
			clean: {
				src: PROJECTS,
				options: {
					cmd: 'rm',
					args: ['-rf', 'node_modules']
				}
			},
			install: {
				src: PROJECTS,
				options: {
					cmd: 'npm',
					args: ['install']
				}
			},
			grunt: {
				src: PROJECTS,
				options: {
					cmd: 'grunt',
					args: []
				}
			},
			git: {
				src: PROJECTS,
				options: {
					cmd: 'git',
					args: ['push']
				}
			},
			publish: {
				src: PROJECTS,
				options: {
					cmd: 'npm',
					args: ['publish']
				}
			}
		}
	});

	grunt.registerTask('default', 'exec');
};
