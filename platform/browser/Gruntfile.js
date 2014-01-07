var path = require('path');
var fs = require('fs');
var browserify = require('browserify');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cli_pkg: grunt.file.readJSON('client/package.json'),
    uglify: {
      options: {
        banner: '/*! <%= cli_pkg.name %> browserified <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        // do not minify _super keyword because 'pseudoclass' needs it
        mangle: {
          except: ['_super']
        }
      },
      build: {
        src: 'dist/<%= cli_pkg.name %>.browserify.js',
        dest: 'site/public/js/<%= cli_pkg.name %>.min.js'
      }
    },
    copy: {
      main: {
        src: 'dist/<%= cli_pkg.name %>.browserify.js',
        dest: 'site/public/js/<%= cli_pkg.name %>.min.js'
      }
    },
    express: {
      custom: {
        options: {
          hostname: 'localhost',
          port: 42042,
          server: path.resolve('./server')
        }
      }
    }
  });

  grunt.registerTask('browserify', 'Bundles kevoree-browser-runtime client javascript using Browserify', function () {
    var cb = this.async();
    
    grunt.log.writeln('Browserifying "kevoree-browser-runtime" client...');
    var options = { cli_pkg: grunt.file.readJSON('client/package.json') };

    grunt.file.mkdir(path.resolve('dist'));
    var bundleFile = fs.createWriteStream(path.resolve('dist', grunt.template.process('<%= cli_pkg.name %>.browserify.js', options)));
    
    browserify().require('kevoree-kotlin', {expose: 'kevoree-kotlin'})
      .require('kevoree-library', {expose: 'kevoree-library'})
      .add(path.resolve('client', grunt.template.process('<%= cli_pkg.name %>.js', options)))
      .bundle()
      .pipe(bundleFile);
    
    bundleFile.on('finish', cb);
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express');

  // Default task
  // => browserify runtime and output it to dist/
  // => uglify browserified runtime and move it to site/js/
  grunt.registerTask('default', ['browserify', 'uglify', 'express', 'express-keepalive']);

  // Dev task
  // => browserify runtime and output it to dist/
  // => copy file to site/js (without uglifying it = more readable in dev)
  grunt.registerTask('dev', ['browserify', 'copy', 'express', 'express-keepalive']);
};