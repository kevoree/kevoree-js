module.exports = function (grunt) {

    grunt.initConfig({
        // retrieve your project package.json
        pkg: grunt.file.readJSON('package.json'),

        // creates kevlib.json which represents your project Kevoree model
        // by parsing your pkg.main entry point
        kevoree_genmodel: {
            main: {
                options: { verbose: true }
            }
        },

        kevoree_registry: {
            src: 'kevlib.json'
        },

        kevoree: {
            run: {
                kevscript: 'kevs/main.kevs'
            },
            comm: {
                kevscript: 'kevs/comm.kevs'
            },
            cloud: {
                options: {
                    node: 'host'
                },
                kevscript: 'kevs/cloud.kevs'
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

    grunt.loadNpmTasks('grunt-kevoree');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-kevoree-genmodel');
    grunt.loadNpmTasks('grunt-kevoree-registry');

    grunt.registerTask('default', ['kevoree_genmodel', 'browserify', 'uglify', 'kevoree_registry']);
    grunt.registerTask('kev', ['kevoree']);
};