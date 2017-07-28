'use strict';

var webpackConfig = require('./webpack.config');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // retrieve your project package.json
    pkg: grunt.file.readJSON('package.json'),

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
          runtime: 'next',
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
  grunt.registerTask('build', ['kevoree_genmodel', 'browser']);
  grunt.registerTask('browser', 'webpack');
  grunt.registerTask('kev', ['kevoree_genmodel', 'kevoree']);
  grunt.registerTask('publish', ['kevoree_genmodel', 'kevoree_registry']);
};
