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

        // pushes your model on http://registry.kevoree.org
        kevoree_registry: { src: 'kevlib.json' },

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
                banner: '// Browserify bundle of <%= pkg.name %>@<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n',
                mangle: {
                    except: ['_super']
                }
            },
            browser: {
                src: '<%= browserify.browser.dest %>',
                dest: 'browser/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-kevoree-registry');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['kevoree_genmodel']);
    grunt.registerTask('build', 'default');
    grunt.registerTask('publish', 'kevoree_registry');
    grunt.registerTask('kev', ['kevoree']);
    grunt.registerTask('browser', ['browserify', 'uglify']);
};