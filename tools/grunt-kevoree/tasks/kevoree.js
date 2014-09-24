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

        var noReinstall = grunt.option('no-reinstall');
        if (!noReinstall) {
            var pkg = grunt.file.readJSON('package.json'),
                modulePath = path.resolve(options.modulesPath, 'node_modules', pkg.name);
            if (grunt.file.exists(modulePath)) {
                grunt.file.delete(modulePath);
                grunt.log.ok('Old module ' + path.relative(process.cwd(), modulePath)['blue'] + ' deleted.');
            }
        }


        var npmResolver = new NPMResolver(options.modulesPath, logger),
            runtime     = new Kevoree(options.modulesPath, logger, npmResolver),
            kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

        var deployErrorHandler = function () {
            grunt.fail.fatal('"grunt-kevoree" unable to bootstrap platform. Shutting down.');
            runtime.stop();
        };

        runtime.on('started', function () {
            var kevs = grunt.file.read(kevscriptPath);
            var model = grunt.file.read('kevlib.json');
            var factory = new kevoree.factory.DefaultKevoreeFactory();
            var loader = factory.createJSONLoader();
            kevsEngine.parse(kevs, loader.loadModelFromString(model).get(0), function (err, model) {
                if (err) {
                    grunt.fail.fatal('"grunt-kevoree" unable to parse KevScript\n'+err.message);
                    done();
                    return;
                }

                runtime.once('deployError', deployErrorHandler);
                runtime.deploy(model);
            });
        });

        runtime.once('deployed', function deployHandler() {
            runtime.off('deployed', deployHandler);
            runtime.off('deployError', deployErrorHandler);
        });

        runtime.start(options.node, options.group);
    });
};
