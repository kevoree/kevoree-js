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

        kevoree: {
            run: {
                kevscript: 'kevs/main.kevs'
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');

    grunt.registerTask('default', ['kevoree_genmodel']);
    grunt.registerTask('kev', ['kevoree']);
};