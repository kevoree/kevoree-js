/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        version: {
            src: [
                'core/**/package.json',
                'extras/**/package.json',
                'library/**/package.json',
                'platform/**/package.json',
                'tools/**/package.json'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-version');

//    grunt.registerTask('default', ['']);
    grunt.registerTask('version', 'version')
};
