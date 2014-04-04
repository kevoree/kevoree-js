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
    path            = require('path');

module.exports = function(grunt) {

    var logger  = new KevoreeLogger('KevoreeRuntime');

    grunt.registerMultiTask('kevoree', 'Automatically runs kevoree runtime (works like mvn kev:run plugin)', function (nodeName) {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            node: 'node0',
            group: 'sync',
            modulesPath: path.resolve('node_modules/grunt-kevoree')
        });
        if (nodeName) {
            // if an argument is given to the task, then consider it is the node name to start the platform on (override)
            options.node = nodeName;
        }

        var runtime     = new Kevoree(options.modulesPath),
            npmResolver = new NPMResolver(options.modulesPath, logger),
            kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

        runtime.on('started', function () {
            var kevs = grunt.file.read(this.data.kevscript);
            kevsEngine.parse(kevs, function (err, model) {
                if (err) {
                    grunt.fail.fatal(err.message);
                    done();
                }

                runtime.deploy(model);
            });
        }.bind(this));

        runtime.on('deployed', function (model) {
            grunt.log.ok('grunt-kevoree: model from '+this.data.kevscript+' deployed successfully :)');
        }.bind(this));

        runtime.start(options.node, options.group);
    });

};
