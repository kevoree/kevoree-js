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
            run: {
                kevscript: 'kevs/main.kevs'
            },
            host: {
                kevscript: 'kevs/host.kevs'
            },
            blog: {
                options: { node: 'host' },
                kevscript: 'kevs/blog.kevs'
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-kevoree-registry');

    grunt.registerTask('default', ['kevoree_genmodel']);
    grunt.registerTask('kev', ['kevoree']);
};