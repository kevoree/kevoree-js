module.exports = function (grunt) {

    grunt.initConfig({
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
        }
    });

    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-kevoree');

    grunt.registerTask('default', ['jade']);
}