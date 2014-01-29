var path = require('path');
var fs = require('fs');
var browserify = require('browserify');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['client/dist/'],
            libraries: ['client/dist/public/libraries/']
        },
        copyto: {
            main: {
                files: [
                    {
                        cwd: 'client/site/',
                        src: [ '**/*' ],
                        dest: 'client/dist/'
                    }
                ]
            }
        },
        browserify: {
            dist: {
                files: {
                    'client/dist/public/js/<%= pkg.name %>.js': ['client/<%= pkg.name %>.js']
                },
                options: {
                    alias: [ path.resolve('node_modules', 'kevoree-library')+':kevoree-library' ]
                }
            },
            kotlin: {
                files: {
                    'client/dist/public/js/kevoree-kotlin.js': []
                },
                options: {
                    alias: [ path.resolve('node_modules', 'kevoree-kotlin')+':kevoree-kotlin' ]
                }
            }
        },
        express: {
            custom: {
                options: {
                    hostname: 'localhost',
                    port: 42042,
                    server: path.resolve('./server/app')
                }
            }
        }
    });

    grunt.registerTask('libfolder', 'Creates browser client libraries folder', function () {
        grunt.file.mkdir('client/dist/public/libraries');
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('client', ['clean:dist', 'copyto:main', 'clean:libraries', 'browserify', 'libfolder']);
    grunt.registerTask('server', ['express', 'express-keepalive']);
    grunt.registerTask('default', ['client', 'server']);
};