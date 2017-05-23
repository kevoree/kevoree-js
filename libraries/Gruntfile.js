'use strict';

const PROJECTS = [
	'chan/{local,remotews}',
	'comp/{consoleprinter,ticker,mqtt*}',
	'node/*',
	'group/{ws,remotews,centralizedws}'
];

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('./grunt-exec')(grunt);

  grunt.initConfig({
    exec: {
      custom: {
        // use this to execute custom commands directly from shell
        // eg. grunt exec:custom --cmd=ls --args=kev --args=node_modules
        src: PROJECTS
      },
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
      publish: {
        src: PROJECTS,
        options: {
          cmd: 'grunt',
          args: ['publish']
        }
      }
    }
  });

  grunt.registerTask('default', 'exec');
};
