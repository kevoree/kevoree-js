/*
 * grunt-kevoree
 * https://github.com/kevoree/kevoree-js
 *
 * Copyright (c) 2014 Maxime Tricoire
 * Licensed under the LGPL-3.0 license.
 */

'use strict';

var kevoree       = require('kevoree-library').org.kevoree,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    NPMResolver   = require('kevoree-resolvers').NPMResolver,
    KevScript     = require('kevoree-kevscript'),
    path          = require('path'),
    npmi          = require('npmi');

module.exports = function(grunt) {

    var logger = new KevoreeLogger('RuntimeGruntTask');

    grunt.registerTask('kevoree', 'Automatically runs kevoree runtime (works like mvn kev:run plugin)', function (nodeName) {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            version: 'latest',
            node: 'node0',
            kevs: path.resolve('kevs/main.kevs'),
            modulesPath: path.resolve('.deploy_units')
        });

        if (nodeName) {
            // if an argument is given to the task, then consider it is the node name to start the platform on (override)
            options.node = nodeName;
        }
        grunt.log.ok('Platform node name: ' + options.node['blue']);

        var runtimeVers = grunt.option('runtime');
        if (runtimeVers) {
            options.version = runtimeVers;
        }

        var kevs = grunt.option('kevs');
        if (kevs) {
            options.kevs = path.resolve('kevs', kevs+'.kevs')
        }

        options.modulesPath = path.resolve(options.modulesPath, options.node);

        grunt.log.ok('Bootstrap script: ' + path.relative(process.cwd(), options.kevs)['blue']);
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var loader = factory.createJSONLoader();

        var npmResolver = new NPMResolver(options.modulesPath, logger),
            kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

        var kevscriptContent = grunt.file.read(options.kevs);

        try {
            var model = grunt.file.read('kevlib.json');
            var contextModel = loader.loadModelFromString(model).get(0);

            kevsEngine.parse(kevscriptContent, contextModel, function (err, model) {
                if (err) {
                    grunt.fail.fatal('"grunt-kevoree" unable to parse KevScript\n'+err.message);
                    done();
                } else {
                    // install specified kevoree-nodejs-runtime version
                    var runtimeOptions = {
                        name: 'kevoree-nodejs-runtime',
                        version: options.version,
                        path: path.resolve(__dirname, '..')
                    };
                    npmi(runtimeOptions, function (err) {
                        if (err) {
                            grunt.fail.fatal('"grunt-kevoree" unable to resolve kevoree-nodejs-runtime@'+options.version+'\n'+err.message);
                            done();
                        } else {
                            var noReinstall = grunt.option('no-reinstall');
                            if (!noReinstall) {
                                var pkg = grunt.file.readJSON('package.json'),
                                    modulePath = path.resolve(options.modulesPath, 'node_modules', pkg.name);
                                if (grunt.file.exists(modulePath)) {
                                    grunt.file.delete(modulePath);
                                    grunt.log.ok('Delete old module: ' + path.relative(process.cwd(), modulePath)['blue']);
                                }
                            }

                            var Kevoree = require('kevoree-nodejs-runtime'),
                                runtime = new Kevoree(options.modulesPath, logger, npmResolver);


                            var errorHandler = function () {
                                grunt.log.writeln();
                                grunt.fail.fatal('"grunt-kevoree" unable to bootstrap platform. Shutting down.');
                                runtime.stop();
                            };

                            runtime.on('started', function () {
                                runtime.once('deployError', errorHandler);
                                runtime.once('adaptationError', errorHandler);
                                runtime.deploy(model);
                            });

                            runtime.once('deployed', function deployHandler() {
                                grunt.log.ok('Bootstrap model deployed successfully');
                                runtime.off('deployed', deployHandler);
                                runtime.off('deployError', errorHandler);
                                runtime.off('adaptationError', errorHandler);
                            });

                            runtime.on('stopped', function () {
                                done();
                            });

                            var runtimePath = path.resolve(runtimeOptions.path, 'node_modules', 'kevoree-nodejs-runtime', 'package.json');
                            grunt.log.ok('Starting runtime: ' + 'v'['blue'] + require(runtimePath).version['blue']);
                            runtime.start(options.node);
                        }
                    });
                }
            });

        } catch (err) {
            grunt.fail.fatal('"grunt-kevoree" unable to load Kevoree model kevlib.json\n'+err.message);
            done();
        }
    });
};
