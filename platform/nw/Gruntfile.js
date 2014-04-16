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
            dist: 'dist',
            builds: 'builds',
            // runtime name
            runtime: 'kevoree-browser-runtime'
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
            distZip: '<%= config.runtime %>.zip',
            'node-webkit': {
                files: [{
                    src: [
                        '<%= config.builds %>',
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
            },
            linux32: {
                expand: true,
                flatten: true,
                src: [
                    '<%= config.runtime %>.zip',
                    'node-webkit/linux32/libffmpegsumo.so',
                    'node-webkit/linux32/nw',
                    'node-webkit/linux32/nw.pak'
                ],
                dest: '<%= config.builds %>/<%= config.runtime %>.linux32/'
            },
            "linux32-libudev0": {
                expand: true,
                flatten: true,
                src: [
                    '<%= config.runtime %>.zip',
                    'node-webkit/linux32-libudev0/libffmpegsumo.so',
                    'node-webkit/linux32-libudev0/nw',
                    'node-webkit/linux32-libudev0/nw.pak'
                ],
                dest: '<%= config.builds %>/<%= config.runtime %>.linux32-libudev0/'
            },
            linux64: {
                expand: true,
                flatten: true,
                src: [
                    '<%= config.runtime %>.zip',
                    'node-webkit/linux64/libffmpegsumo.so',
                    'node-webkit/linux64/nw',
                    'node-webkit/linux64/nw.pak'
                ],
                dest: '<%= config.builds %>/<%= config.runtime %>.linux64/'
            },
            "linux64-libudev0": {
                expand: true,
                flatten: true,
                src: [
                    '<%= config.runtime %>.zip',
                    'node-webkit/linux64-libudev0/libffmpegsumo.so',
                    'node-webkit/linux64-libudev0/nw',
                    'node-webkit/linux64-libudev0/nw.pak'
                ],
                dest: '<%= config.builds %>/<%= config.runtime %>.linux64-libudev0/'
            },
            win: {
                expand: true,
                flatten: true,
                src: [
                    '<%= config.runtime %>.zip',
                    'node-webkit/win/ffmpegsumo.dll',
                    'node-webkit/win/icudt.dll',
                    'node-webkit/win/libEGL.dll',
                    'node-webkit/win/libGLESv2.dll',
                    'node-webkit/win/nw.exe',
                    'node-webkit/win/nw.pak'
                ],
                dest: '<%= config.builds %>/<%= config.runtime %>.win/'
            },
            mac: {
                expand: true,
                cwd: 'node-webkit/mac/node-webkit.app',
                src: 'Contents/**',
                dest: '<%= config.builds %>/<%= config.runtime %>.mac/<%= config.runtime %>.app'
            },
            macDist: {
                expand: true,
                cwd: '<%= config.dist %>/',
                src: '**',
                dest: '<%= config.builds %>/<%= config.runtime %>.mac/<%= config.runtime %>.app/Contents/Resources/app.nw'
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
        },

        // Zip dist/ folder into <%= config.runtime %>.zip
        compress: {
            dist: {
                options: {
                    mode: 'zip',
                    archive: '<%= config.runtime %>.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'dist/',
                        expand: true,
                        src: ['**']
                    }
                ]
            },
            linux32: {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.linux32.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.linux32/**']
                    }
                ]
            },
            "linux32-libudev0": {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.linux32-libudev0.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.linux32-libudev0/**']
                    }
                ]
            },
            linux64: {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.linux64.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.linux64/**']
                    }
                ]
            },
            "linux64-libudev0": {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.linux64-libudev0.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.linux64-libudev0/**']
                    }
                ]
            },
            win: {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.win.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.win/**']
                    }
                ]
            },
            mac: {
                options: {
                    mode: 'zip',
                    archive: '<%= config.builds %>/<%= config.runtime %>.mac.zip',
                    pretty: true
                },
                files: [
                    {
                        cwd: 'builds/',
                        expand: true,
                        src: ['<%= config.runtime %>.mac/**']
                    }
                ]
            }
        }
    });

    grunt.registerTask('build', 'Creates dist/ folder', function (target) {
        var tasks = [
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
            'htmlmin'
        ];

        grunt.task.run(tasks);
    });

    grunt.registerTask('dlNodeWebkit', 'Download node-webkit binaries into node-webkit/', function () {
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

    grunt.registerTask('prepareRuntimes', 'Prepare runtime directories for Linux (32, 64), Windows & Mac', function () {
        var tasks = [
            'compress:dist',
            'copy:linux32',
            'copy:linux32-libudev0',
            'copy:linux64',
            'copy:linux64-libudev0',
            'copy:win',
            'copy:mac',
            'copy:macDist'
        ];

        grunt.task.run(tasks);
    });

    grunt.registerTask('buildRuntimes', 'Build runtimes for Linux & Windows (Mac platform does not need this part)', function () {
        var done = this.async();
        var childprocess = exec('sh build-runtimes.sh', function (err) {
            if (err) {
                grunt.fail.fatal(err);
                return done();
            }
            done();
        });

        childprocess.stdout.on('data', function (data) {
            grunt.log.writeln(data);
        });
    });

    grunt.registerTask('default', [
        'clean',
        'build',
        'dlNodeWebkit',
        'prepareRuntimes',
        'clean:distZip',
        'buildRuntimes',
        'compress:linux32',
        'compress:linux32-libudev0',
        'compress:linux32',
        'compress:linux64-libudev0',
        'compress:win',
        'compress:mac'
    ]);

    // just build runtimes
    grunt.registerTask('nodewebkit', [
        'buildRuntimes'
    ]);
};
