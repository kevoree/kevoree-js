module.exports = function(grunt) {

    var packages = [
        'core/{**,}/package.json',
        'extras/{**,}/package.json',
        'library/{**,}/package.json',
        'platform/{**,}/package.json',
        'tools/{**,}/package.json'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        version: {
            src: packages
        },
        deps_manager: {
            options: {
                version: '<%= pkg.version %>',
                pattern: 'kevoree-.*',
                ignore: 'kevoree-web-editor-client' // kevoree editor static client isn't in this project repository
            },
            src: packages
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
    grunt.loadNpmTasks('grunt-deps-manager');

    grunt.registerTask('release', ['version', 'deps_manager', 'publish']);
};
