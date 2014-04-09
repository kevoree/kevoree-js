// Generated on 2014-03-26 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path'),
    npmi = require('npmi'),
    exec = require('child_process').exec;

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            'node-webkit': {
                files: [{
                    src: [
                        'builds',
                        'node-webkit'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: '<%= config.app %>/'
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        uglify: {
            options: {
                mangle: {
                    except: ['_super']
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        'package.json',
                        'node_modules/**',
                        'lib/**'
                    ]
                }]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/bower_components/bootstrap/dist',
                    dest: '<%= config.dist %>',
                    src: [
                        'fonts/**'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: [
                'copy:styles',
                'svgmin',
                'hogan'
            ]
        },

        // Creates compiled templates from templates/**/*.html using hogan (mustachejs-like)
        // Makes your-template.html compiled js script available in window Global Scope as EditorTemplates['your-template']
        hogan: {
            main: {
                options: {
                    prettify: true,
                    namespace: 'RuntimeTemplates',
                    defaultName: function(file) {
                        return path.basename(file, '.html');
                    }
                },
                files: {
                    '.tmp/scripts/templates.js': ['templates/**/*.html']
                }
            }
        }
    });

    grunt.registerTask('checkKevoreeLibrary', 'Check if app/node_modules is valid (only one kevoree-library module)', function () {
        var done = this.async();
        var findPath = 'app/node_modules';
        exec('find '+findPath+' -name kevoree-library|wc -l', function (err, stdout) {
            if (err) {
                grunt.fail.warn(err);
                return done();
            }

            if (parseInt(stdout) !== 1) {
                grunt.fail.fatal('There is more than one kevoree-library module in '+findPath);
            } else {
                grunt.log.writeln(findPath+' contains only 1 kevoree-library module');
            }
            done();
        });
    });

    grunt.registerTask('dlNodeWebkit', 'Download node-webkit from official website', function () {
        var done = this.async();
        var childprocess = exec('sh dl-node-webkit.sh', function (err) {
            if (err) {
                grunt.fail.warn(err);
                return done();
            }
            done();
        });

        childprocess.stdout.on('data', function (data) {
            grunt.log.writeln(data);
        });
    });

    grunt.registerTask('buildRuntimes', 'Build Kevoree Browser Runtime for Linux (32, 64), Windows & Mac', function (zip) {
        var doZip = '';
        if (zip === 'zip') {
            doZip = ' -z';
        }
        var done = this.async();
        var childprocess = exec('sh build-runtimes.sh'+doZip, function (err) {
            if (err) {
                grunt.fail.warn(err);
                return done();
            }
            done();
        });

        childprocess.stdout.on('data', function (data) {
            grunt.log.writeln(data);
        });
    });

    grunt.registerTask('default', [
        'checkKevoreeLibrary',
        'clean',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'copy:bootstrap',
        'usemin',
        'htmlmin',
        'dlNodeWebkit',
        'buildRuntimes:zip'
    ]);

    grunt.registerTask('build-dev', [
        'checkKevoreeLibrary',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'copy:bootstrap',
        'usemin',
        'htmlmin',
        'buildRuntimes'
    ]);

    // just build runtimes
    grunt.registerTask('nodewebkit', [
        'buildRuntimes'
    ]);
};
