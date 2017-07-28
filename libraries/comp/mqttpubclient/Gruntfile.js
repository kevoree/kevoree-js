'use strict';

module.exports = function gruntHandler(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    kevoree: {
      main: {
        options: {
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
    }
  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', 'kevoree_genmodel');
  grunt.registerTask('kev', ['build', 'kevoree']);
  grunt.registerTask('publish', ['build', 'kevoree_registry']);
};
