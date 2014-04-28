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
        }
    });

    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['jade', 'kevoree_genmodel', 'browserify']);
    grunt.registerTask('kev', ['kevoree']);
}
