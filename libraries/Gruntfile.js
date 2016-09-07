'use strict';

const PROJECTS = [
  'chan/*',
  'comp/*',
  'node/*',
  'group/*'
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
      genmodel: {
        src: PROJECTS,
        options: {
          cmd: 'grunt',
          args: ['kevoree_genmodel']
        }
      },
      publish: {
        src: PROJECTS,
        options: {
          cmd: 'grunt',
          args: ['kevoree_registry']
        }
      }
    }
  });
};
