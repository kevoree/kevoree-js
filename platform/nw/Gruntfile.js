// Generated on 2014-03-05 using generator-webapp 0.4.7
'use strict';

var path = require('path');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: 'runtimes', // Where the build version of my node-webkit app is saved
                mac: true,
                win: true,
                linux32: false,
                linux64: true
            },
            src: ['webapp/dist/**'] // Your node-webkit app
        }
    });
};
