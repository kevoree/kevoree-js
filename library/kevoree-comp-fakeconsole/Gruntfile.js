module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        kevoree_genmodel: {
            main: {
                options: {
                    quiet: false,
                    verbose: true
                }
            }
        },
        jade: {
            node: {
                files: {
                    'generated-ui/': ['ui/*.jade']
                },
                options: {
                    wrap: 'node'
                }
            }
        },
        kevoree: {
            run: {
                kevscript: 'kevs/main.kevs'
            }
        },
        browserify: {
            main: {
                src: '<%= pkg.main %>',
                dest: 'browser/<%= pkg.name %>.js',
                options: {
                    alias: ['<%= pkg.main %>:<%= pkg.name %>'],
                    external: [
                        'kevoree-library',
                        'kevoree-kotlin'
                    ]
                }
            }
        },

        uglify: {
            options: {
                banner: '// Browserify bundle of <%= pkg.name %>@<%= pkg.version %> - Generated on <%= getDate() %>\n',
                mangle: {
                    except: ['_super']
                }
            },
            bundle: {
                src: '<%= browserify.main.dest %>',
                dest: '<%= browserify.main.dest %>'
            }
        },
        getDate: function () {
            var d = new Date();
            return d.toISOString().split('T')[0] + ' ' + d.toLocaleTimeString();
        }
    });

    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');

    grunt.registerTask('default', ['jade', 'kevoree_genmodel', 'browserify', 'uglify']);
    grunt.registerTask('kev', ['kevoree']);
};
