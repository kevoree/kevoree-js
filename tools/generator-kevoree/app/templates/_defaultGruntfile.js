module.exports = function (grunt) {

    grunt.initConfig({
        kevoree: {
            run: {
                kevscript: 'kevs/main.kevs'
            }
        }
    });

    grunt.loadNpmTasks('grunt-kevoree');

    grunt.registerTask('default', ['kevoree']);
}