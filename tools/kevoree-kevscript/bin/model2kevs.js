#!/usr/bin/env node
'use strict';

var path          = require('path'),
    fs            = require('fs'),
    config        = require('tiny-conf'),
    KevScript     = require('./../lib/KevScript'),
    kevoree       = require('kevoree-library'),
    kConst        = require('kevoree-const'),
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    optimist      = require('optimist')
        .usage('Usage: $0 <path/to/a/model.json> [-o path/to/output/model.kevs]')
        .demand(['o'])
        .alias('o', 'output')
        .describe('o', 'Where to write the output Kevoree Kevscript model')
        .default('o', 'model.kevs');

require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

if (optimist.argv._.length === 1) {
    var input = path.resolve(optimist.argv._[0]);
    var output = path.resolve(optimist.argv.o);
    var factory = new kevoree.factory.DefaultKevoreeFactory();
    var loader = factory.createJSONLoader();
    var logger = new KevoreeLogger('KevScript');
    var logLevel = config.get('log.level');
    if (logLevel) {
      logger.setLevel(logLevel);
    }
    var kevs = new KevScript(logger);

    fs.readFile(input, 'utf8', function (err, data) {
        if (err) {
          throw err;
        } else {
          var script = kevs.parseModel(loader.loadModelFromString(data).get(0));
          fs.writeFile(output, script, 'utf8', function (err) {
              if (err) {
                throw err;
              } else {
                console.log('Kevoree Kevscript generated succefully');
                console.log('model used: '+input);
                console.log('kevs gen:   '+output);
              }
          });
        }
    });
} else {
    console.log(optimist.help());
}
