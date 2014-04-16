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

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');

    grunt.registerTask('default', ['kevoree_genmodel', 'browserify']);
    grunt.registerTask('run', ['kevoree']);
}