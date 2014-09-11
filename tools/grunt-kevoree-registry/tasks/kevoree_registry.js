/*
 * grunt-kevoree-registry
 * https://github.com/kevoree/kevoree-js
 *
 * Copyright (c) 2014 Maxime Tricoire
 * Licensed under the LGPL-3.0 license.
 */

'use strict';
var registry = require('kevoree-registry-client');
var kevoree  = require('kevoree-library').org.kevoree;

module.exports = function(grunt) {

    grunt.registerMultiTask('kevoree_registry', 'Grunt plugin that handles POST of Kevoree models to registry.kevoree.org using kevoree-registry-client', function() {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            type: 'json'
        });

        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var compare = factory.createModelCompare();
        var loader = factory.createJSONLoader();
        var serializer = factory.createJSONSerializer();
        var model = factory.createContainerRoot();
        factory.root(model);

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                var modelData = grunt.file.read(filepath);
                var mergeSeq = compare.merge(model, loader.loadModelFromString(modelData).get(0));
                mergeSeq.applyOn(model);
                grunt.log.writeln('Model ' + filepath['blue'] + ' merged before push.');
            });

            grunt.log.writeln('Pushing model to http://registry.kevoree.org ...');
            registry.post({model: serializer.serialize(model), type: options.type}, function (err) {
                if (err) {
                    grunt.fail.fatal(err.message);
                }
                grunt.log.writeln('Model(s) successfully published'['green']);
                done();
            });
        });
    });

};
