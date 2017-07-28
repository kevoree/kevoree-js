'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    // retrieve your project package.json
    pkg: grunt.file.readJSON('package.json'),

    kevoree: {
      main: {
        runtime: 'next'
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

    kevoree_registry: {
      src: 'kevlib.json'
    },

    browserify: {
      browser: {
        options: {
          external: ['kevoree-library'],
          alias: ['<%= pkg.main %>:<%= pkg.name %>']
        },
        src: ['<%= pkg.main %>'],
        dest: 'browser/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['_super']
        }
      },
      browser: {
        src: '<%= browserify.browser.dest %>',
        dest: 'browser/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-kevoree');
  grunt.loadNpmTasks('grunt-kevoree-genmodel');
  grunt.loadNpmTasks('grunt-kevoree-registry');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', 'Build Kevoree module', function () {
    if (process.env.KEVOREE_RUNTIME !== 'dev') {
      grunt.tasks([
                'kevoree_genmodel',
                'browser'
            ]);
    }
  });
  grunt.registerTask('publish', ['kevoree_genmodel', 'kevoree_registry']);
  grunt.registerTask('kev', ['kevoree_genmodel', 'kevoree']);
  grunt.registerTask('browser', ['browserify', 'uglify']);
};
