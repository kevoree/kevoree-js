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
    }
  });

  grunt.loadNpmTasks('grunt-jade');
}