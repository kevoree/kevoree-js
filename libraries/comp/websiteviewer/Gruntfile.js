module.exports = function (grunt) {

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

        kevoree_registry: {
            src: 'kevlib.json'
        },

        kevoree: {
            options: {
                browserDevMode: true
            }
        },

        browserify: {
            browser: {
                options: {
                    alias: [ '<%= pkg.main %>:<%= pkg.name %>' ]
                },
                src: [],
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
        },

        watch: {
            browser: {
                files: ['lib/{,**/}*.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-kevoree-registry');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', 'Build Kevoree module', function () {
        if (process.env.KEVOREE_RUNTIME !== 'dev') {
            grunt.tasks([
                'kevoree_genmodel',
                'uglify',
                'browser'
            ]);
        }
    });
    grunt.registerTask('publish', 'kevoree_registry');
    grunt.registerTask('kev', 'Run project using kevscript', function () {
        grunt.tasks([
            'kevoree_genmodel',
            'browserify',
            'kevoree'
        ]);
    });
    grunt.registerTask('browser', 'browserify');
};
