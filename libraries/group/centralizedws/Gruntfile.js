'use strict';

const webpackConfig = require('./webpack.config');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      options: {
        configFile: 'package.json'
      },
      target: ['lib', 'test']
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
      main: webpackConfig,
    }
  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['eslint', 'kevoree_genmodel', 'browser']);
  grunt.registerTask('browser', 'webpack');
  grunt.registerTask('kev', ['eslint', 'kevoree_genmodel', 'kevoree']);
  grunt.registerTask('publish', ['kevoree_genmodel', 'kevoree_registry']);
};
