#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const config = require('tiny-conf');
const KevScript = require('./../lib/KevScript');
const kevoree = require('kevoree-library');
const kConst = require('kevoree-const');
const loggerFactory = require('kevoree-logger');
const optimist = require('optimist')
  .usage('Usage: $0 <path/to/a/model.json> [-o path/to/output/model.kevs]')
  .demand(['o'])
  .alias('o', 'output')
  .describe('o', 'Where to write the output Kevoree Kevscript model')
  .default('o', 'model.kevs');

require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

if (optimist.argv._.length === 1) {
  const input = path.resolve(optimist.argv._[0]);
  const output = path.resolve(optimist.argv.o);
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const loader = factory.createJSONLoader();
  const logger = loggerFactory.create('KevScript');
  const logLevel = config.get('log.level');
  if (logLevel) {
    logger.setLevel(logLevel);
  }
  const kevs = new KevScript(logger);

  fs.readFile(input, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const script = kevs.parseModel(loader.loadModelFromString(data).get(0));
      fs.writeFile(output, script, 'utf8', (err) => {
        if (err) {
          throw err;
        } else {
          console.log('Kevoree Kevscript generated succefully');
          console.log('model used: ' + input);
          console.log('kevs gen:   ' + output);
        }
      });
    }
  });
} else {
  console.log(optimist.help());
}
