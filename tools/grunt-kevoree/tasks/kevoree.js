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
    async         = require('async'),
    path          = require('path'),
    npmi          = require('npmi'),
    npm           = require('npm');

module.exports = function(grunt) {

    var logger = new KevoreeLogger('RuntimeGruntTask');

    grunt.registerTask('kevoree', 'Automatically runs kevoree runtime (works like mvn kev:run plugin)', function () {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            runtime: 'latest',
            node: 'node0',
            kevscript: path.resolve('kevs/main.kevs'),
            modulesPath: path.resolve('.deploy_units'),
            mergeLocalLibraries: [],
            logLevel: 'debug'
        });

        switch (options.logLevel) {
            case 'all':
                logger.setLevel(KevoreeLogger.ALL);
                break;

            case 'debug':
                logger.setLevel(KevoreeLogger.DEBUG);
                break;

            default:
            case 'info':
                logger.setLevel(KevoreeLogger.INFO);
                break;

            case 'warn':
                logger.setLevel(KevoreeLogger.WARN);
                break;

            case 'error':
                logger.setLevel(KevoreeLogger.ERROR);
                break;

            case 'quiet':
                logger.setLevel(KevoreeLogger.QUIET);
                break;
        }

        var nodeName = grunt.option('node');
        if (nodeName) {
            options.node = nodeName;
        }
        grunt.log.ok('Platform node name: ' + options.node['blue']);

        var runtimeVers = grunt.option('runtime');
        if (runtimeVers) {
            options.version = runtimeVers;
        }

        var kevscript = grunt.option('kevscript');
        if (kevscript) {
            options.kevscript = path.resolve('kevs', kevscript);
        }

        options.modulesPath = path.resolve(options.modulesPath, options.node);

        var bootstrapScriptPath = path.relative(process.cwd(), options.kevscript);
        if (bootstrapScriptPath.startsWith(path.join('..', '..', '..'))) {
            bootstrapScriptPath = path.resolve(options.kevscript);
        }
        grunt.log.ok('Bootstrap script: ' + bootstrapScriptPath['blue']);
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var loader = factory.createJSONLoader();
        var compare = factory.createModelCompare();

        var npmResolver = new NPMResolver(options.modulesPath, logger),
            kevsEngine  = new KevScript({ resolvers: { npm: npmResolver } });

        var kevscriptContent = grunt.file.read(options.kevscript);

        try {
            var model = grunt.file.read('kevlib.json');
            var contextModel = loader.loadModelFromString(model).get(0);

            var mergeTasks = [];
            options.mergeLocalLibraries.forEach(function (localLibPath) {
                mergeTasks.push(function (cb) {
                    var localLibModel = grunt.file.read(path.resolve(localLibPath, 'kevlib.json'));
                    var model = loader.loadModelFromString(localLibModel).get(0);
                    compare.merge(contextModel, model).applyOn(contextModel);

                    npm.load({loglevel: 'silent'}, function (err) {
                        if (err) {
                            cb(new Error('"grunt-kevoree" unable to load "npm" when trying to link "'+localLibPath+'"'));
                        } else {
                            var savedPrefix = npm.prefix;
                            npm.prefix = localLibPath;
                            npm.commands.link([], function (err) {
                                if (err) {
                                    cb(new Error('"grunt-kevoree" unable to run "npm link" in "'+localLibPath+'"'));
                                } else {
                                    npm.prefix = path.resolve(options.modulesPath);
                                    var localLibPkg = JSON.parse(grunt.file.read(path.resolve(localLibPath, 'package.json')));
                                    npm.commands.link([localLibPkg.name], function (err) {
                                        npm.prefix = savedPrefix;
                                        if (err) {
                                            cb(new Error('"grunt-kevoree" unable to run "npm link '+localLibPkg.name+'" in "'+npm.prefix+'"'));
                                        } else {
                                            grunt.log.ok('Merged local library: ' + localLibPkg.name['blue']);
                                            cb();
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            });

            async.series(mergeTasks, function (err) {
               if (err) {
                   grunt.fail.fatal(err.message);
                   done();
               }  else {
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
                                   grunt.fail.fatal('"grunt-kevoree" unable to resolve kevoree-nodejs-runtime@'+options.runtime+'\n'+err.message);
                                   done();
                                   process.exit(1);
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
               }
            });

        } catch (err) {
            grunt.fail.fatal('"grunt-kevoree" unable to load Kevoree model kevlib.json\n'+err.message);
            done();
        }
    });
};
