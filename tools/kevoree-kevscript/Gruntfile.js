module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                files: {
                    'browser/<%= pkg.name %>.js': ['<%= pkg.name %>.js']
                },
                options: {
                    standalone: '<%= pkg.name %>'
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> browserified & uglyfied <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                // do not minify _super keyword because 'pseudoclass' needs it
                mangle: {
                    except: ['_super']
                }
            },
            build: {
                src: 'browser/<%= pkg.name %>.js',
                dest: 'browser/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'uglify']);
};