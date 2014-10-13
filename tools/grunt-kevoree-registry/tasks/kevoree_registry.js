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
            type: 'json',
            host: 'registry.kevoree.org',
            port: 80
        });

        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var compare = factory.createModelCompare();
        var loader = factory.createJSONLoader();
        var serializer = factory.createJSONSerializer();
        var model = factory.createContainerRoot();
        factory.root(model);

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var merged = [];
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
                try {
                    var fileModel = loader.loadModelFromString(modelData).get(0);
                    var mergeSeq = compare.merge(model, fileModel);
                    mergeSeq.applyOn(model);
                    merged.push(filepath);
                } catch (err) {
                    done(new Error('Unable to load model from file "'+filepath+'"'));
                }
            });

            if (merged.length === 0) {
                done(new Error('No model found'));
            } else {
                if (merged.length === 1) {
                    grunt.log.writeln('Model: ' + merged[0]['blue']);
                } else {
                    grunt.log.writeln('Models: ' + merged.join(', ')['blue']);
                }

                var url = options.host + ((options.port !== 80) ? ':' + options.port : '');
                grunt.log.writeln('Registry: '+'http://'['blue']+url['blue']);

                try {
                    var regOpts = {
                        host: options.host,
                        port: options.port,
                        model: serializer.serialize(model),
                        type: options.type
                    };

                    registry.post(regOpts, function (err) {
                        if (err) {
                            done(err);
                        } else {
                            grunt.log.ok('Model successfully published');
                            done();
                        }
                    });
                } catch (err) {
                    done(new Error('Unable to serialize model'));
                }
            }
        });
    });

};
