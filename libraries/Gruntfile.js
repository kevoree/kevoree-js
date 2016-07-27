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
      install: {
        src: PROJECTS,
        options: {
          cmd: 'npm',
          args: ['install']
        }
      },
      kevoree_registry: {
        src: PROJECTS,
        options: {
          cmd: 'grunt',
          args: ['kevoree_registry']
        }
      },
      kevoree_genmodel: {
        src: PROJECTS,
        options: {
          cmd: 'grunt',
          args: ['kevoree_genmodel']
        }
      }
    }
  });
};
