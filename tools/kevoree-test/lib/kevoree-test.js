/*
 * kevoree-test
 * https://github.com/kevoree/kevoree-js
 *
 * Copyright (c) 2014 Maxime Tricoire
 * Licensed under the LGPL-3.0 license.
 */

'use strict';

var Kevoree = require('kevoree-nodejs-runtime');
var Logger  = require('kevoree-commons').KevoreeLogger;
var NPMResolver = require('kevoree-resolvers').NPMResolver;
var KevScript = require('kevoree-kevscript');
var os = require('os');
var fs = require('fs');

var KevoreeTest = function () {
    var logger = new Logger('KevoreeTest');
    var modulesPath = os.tmpdir();
    var resolver = new NPMResolver(modulesPath, logger);
    var kevs = new KevScript({ resolvers: { npm: resolver } });

    /**
     * Starts a kevoree-js runtime with the given parameters
     * @param node platform nodeName to use
     * @param group groupName to use for model deployment
     * @param kevsPath path to a model.kevs to bootstrap on
     * @param callback function (Error, ContainerRoot)
     */
    this.bootstrap = function (node, group, kevsPath, callback) {
        var kevoree = new Kevoree(modulesPath, resolver);

        fs.readFile(kevsPath, 'utf8', function (err, data) {
            if (err) {
                callback(err);
                return;
            }

            kevs.parse(data, function (err, model) {
                if (err) {
                    callback(err);
                    return;
                }

                kevoree.start(node, group);
                kevoree.on('started', function () {
                    kevoree.deploy(model);
                    kevoree.once('deployed', function (model) {
                        kevoree.off('error', callback);
                        callback(null, model);
                    });
                    kevoree.on('error', callback);
                });
            });
        });
    };

    this.attribute = function (path, expectedVal) {

    };
};

module.exports = new KevoreeTest();
