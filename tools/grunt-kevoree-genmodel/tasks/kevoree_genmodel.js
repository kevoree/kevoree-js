/*
 * grunt-kevoree-genmodel
 * https://github.com/kevoree/kevoree-js
 *
 * Copyright (c) 2014 Maxime Tricoire
 * Licensed under the LGPL-3.0 license.
 */

'use strict';
var kevoreeGen = require('kevoree-gen-model');

module.exports = function(grunt) {

    grunt.registerMultiTask('kevoree_genmodel', 'Generates a Kevoree model by parsing current Kevoree-entity module project', function() {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            quiet: false,
            path: process.cwd()
        });

        kevoreeGen(options.path, options.quiet, function (err) {
            if (err) {
                grunt.fail.fatal(err.message);
            }
            done();
        });
    });

};
