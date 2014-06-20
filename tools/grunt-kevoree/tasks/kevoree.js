/*
 * grunt-kevoree
 * https://github.com/kevoree/kevoree-js
 *
 * Copyright (c) 2014 Maxime Tricoire
 * Licensed under the LGPL-3.0 license.
 */

'use strict';

var Kevoree         = require('kevoree-nodejs-runtime'),
    KevoreeLogger   = require('kevoree-commons').KevoreeLogger,
    NPMResolver     = require('kevoree-resolvers').NPMResolver,
    KevScript       = require('kevoree-kevscript'),
    path            = require('path'),
    npmi            = require('npmi');

module.exports = function(grunt) {

    var logger  = new KevoreeLogger('KevoreeRuntime');

    grunt.registerMultiTask('kevoree', 'Automatically runs kevoree runtime (works like mvn kev:run plugin)', function (nodeName) {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            node: 'node0',
            group: 'sync',
            modulesPath: path.resolve('.deploy_units'),
            gui: false // TODO not implemented yet
        });
        if (nodeName) {
            // if an argument is given to the task, then consider it is the node name to start the platform on (override)
            options.node = nodeName;
        }

        options.modulesPath = path.resolve(options.modulesPath, options.node);

        npmi({
            name:           path.resolve('.'),  // local path
            localInstall:   true,               // local library => local install
            path:           options.modulesPath,
            forceInstall:   true                // always reinstall local library (to keep them up-to-date)
        }, function (err) {
            if (err) {
                grunt.fail.fatal(err.message);
                done();
                return;
            }

            var npmResolver = new NPMResolver(options.modulesPath, logger),
                runtime     = new Kevoree(options.modulesPath, npmResolver),
                kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

            runtime.on('started', function () {
                var kevs = grunt.file.read(this.data.kevscript);
                kevsEngine.parse(kevs, function (err, model) {
                    if (err) {
                        grunt.fail.fatal(err.message);
                        done();
                        return;
                    }

                    runtime.deploy(model);
                });
            }.bind(this));

            var deployedListener = function () {
                grunt.log.ok('grunt-kevoree: model from '+this.data.kevscript+' deployed successfully :)');
                runtime.off('deployed', deployedListener);
            }.bind(this);

            runtime.on('deployed', deployedListener);

            runtime.start(options.node, options.group);
        }.bind(this));
    });

};
