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

        var kevscriptPath = grunt.option('kevs');
        if (typeof kevscriptPath !== 'string') {
            kevscriptPath = this.data.kevscript;
            if (!kevscriptPath) {
                grunt.fail.fatal('You must specify a KevScript file to bootstrap on.');
                done();
                return;
            }
        }

        options.modulesPath = path.resolve(options.modulesPath, options.node);
        var pkg = grunt.file.readJSON('package.json');
        grunt.file.delete(path.resolve(options.modulesPath, 'node_modules', pkg.name));

        var npmResolver = new NPMResolver(options.modulesPath, logger),
            runtime     = new Kevoree(options.modulesPath, npmResolver),
            kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

        runtime.on('started', function () {
            var kevs = grunt.file.read(kevscriptPath);
            kevsEngine.parse(kevs, function (err, model) {
                if (err) {
                    grunt.fail.fatal(err.message);
                    done();
                    return;
                }

                runtime.deploy(model);
            });
        });

        function deployedListener() {
            grunt.log.ok('grunt-kevoree: model from '+kevscriptPath+' deployed successfully :)');
            runtime.off('deployed', deployedListener);
        }

        runtime.on('deployed', deployedListener);

        runtime.start(options.node, options.group);
    });

};
