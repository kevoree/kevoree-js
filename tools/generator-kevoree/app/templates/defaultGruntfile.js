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

        // generates compiled version of your views in Javascript
        // in order to use them within your code
        // You can, then, do something like this:
        // var myView = require('../generated-ui/my-view.js');
        // and use it like this:
        // var htmlString = myView({foo: 'bar'});
        kevoree: {
            run: {
                kevscript: 'kevs/main.kevs'
            }
        },


        browserify: {
            main: {
                src: '<%%= pkg.main %>',
                dest: 'browser/<%%= pkg.name %>.js',
                options: {
                    alias: ['<%%= pkg.main %>:<%= pkg.name %>'],
                    external: [
                        'kevoree-library',
                        'kevoree-kotlin'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['kevoree_genmodel', 'browserify']);
    grunt.registerTask('run', ['kevoree']);
};