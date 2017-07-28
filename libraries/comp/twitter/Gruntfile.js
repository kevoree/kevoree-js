'use strict';

var path = require('path');
var pkg = require('./package.json');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    kevoree: {
      main: {
        options: {
          runtime: 'next',
          localModel: 'kevlib.json',
          ctxVars: {
            version: function () {
              var Type = require(path.resolve(pkg.main));
              return Type.prototype.tdef_version;
            }
          }
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
    }
  });

  grunt.registerTask('default', ['model']);
  grunt.registerTask('model', ['kevoree_genmodel']);
  grunt.registerTask('publish', ['kevoree_genmodel', 'kevoree_registry']);
  grunt.registerTask('kev:run', ['kevoree']);
};
