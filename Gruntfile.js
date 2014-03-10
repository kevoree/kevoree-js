/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        version: {
            src: [
                'core/{**,}/package.json',
                'extras/{**,}/package.json',
                'library/{**,}/package.json',
                'platform/{**,}/package.json',
                'tools/{**,}/package.json'
            ]
        },
        publish: {
            options: {
                ignore: [
                    'node_modules',
                    'org.kevoree.model.js'
                ]
            },
            src: [ '**/*' ]
        }
    });

    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-publish');
};
