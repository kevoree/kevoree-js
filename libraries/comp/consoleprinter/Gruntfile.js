'use strict';

var pkg = require('./package.json');
var webpackConfig = require('./webpack.config');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: pkg.babel,
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },

    // creates kevlib.json which represents your project Kevoree model
    // by parsing your pkg.main entry point
    kevoree_genmodel: {
      main: {
        options: {
          quiet: false,
          verbose: true
        }
      }
    },

    kevoree: {
      main: {
        options: {
          browserDevMode: false
        }
      }
    },

    // publish your kevlib.json model to the Kevoree Registry
    kevoree_registry: {
      src: 'kevlib.json'
    },

    webpack: {
      main: webpackConfig
    }
  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['babel', 'kevoree_genmodel', 'webpack']);
  grunt.registerTask('kev', ['build', 'kevoree']);
  grunt.registerTask('publish', ['build', 'kevoree_registry']);
};
