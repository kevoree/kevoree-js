#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const config = require('tiny-conf');
const KevScript = require('./../lib/KevScript');
const kevoree = require('kevoree-library');
const kConst = require('kevoree-const');
const loggerFactory = require('kevoree-logger');

const optimist = require('optimist').usage('Usage: $0 <path/to/a/model.kevs> [-c /path/to/a/context/model.json -o /path/to/output/model.json]').demand(['o'])
  // -o, --output
  .alias('o', 'output').describe('o', 'Where to write the output Kevoree JSON model').default('o', 'model.json')
  // -c, --ctxModel
  .alias('c', 'ctxModel').describe('ctxModel', 'A context model to apply KevScript on')
  // --ctxVar
  .describe('ctxVar', 'A context variable to replace a %NAME% in the script (usage: --ctxVar NAME=foo)')
  // --log.level
  .describe('log.level', 'Change logger level (ALL|DEBUG|INFO|WARN|ERROR|QUIET) (default: INFO)');

require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

config.set('cache', {
  root: path.join(kConst.CONFIG_PATH, '..', 'tdefs'),
  ttl: 1000 * 60 * 60 * 24 // 24 hours
});

if (optimist.argv._.length === 1) {
  const input = path.resolve(optimist.argv._[0]);
  const output = path.resolve(optimist.argv.o);
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const serializer = factory.createJSONSerializer();
  const logger = loggerFactory.create('KevScript');
  const logLevel = config.get('log.level');
  if (logLevel) {
    logger.setLevel(logLevel);
  }

  const registryResolver = KevScript.Resolvers.registryResolverFactory(logger);
  const fsResolver = KevScript.Resolvers.fsResolverFactory(logger, registryResolver);
  const modelResolver = KevScript.Resolvers.modelResolverFactory(logger, fsResolver);
  const rootResolver = KevScript.Resolvers.tagResolverFactory(logger, modelResolver);

  const kevs = new KevScript(logger, { resolver: rootResolver });
  const ctxVars = {};
  if (optimist.argv.ctxVar) {
		[].concat(optimist.argv.ctxVar).forEach((ctxvar) => {
      const data = ctxvar.split('=');
      ctxVars[data[0]] = data[1];
    });
  }

  /**
   *
   * @param err
   * @param model
   */
  const kevscriptHandler = function (err, model) {
    if (err) {
      if (err.nt) {
        console.log(chalk.red('Unable to parse KevScript'));
        console.log('Unexpected token "' + err.nt + '" (l:' + err.line + ':' + err.col + ')');
      } else {
        console.log(chalk.red('KevScript execution error'));
        console.log(err.stack);
      }
      process.exit(1);
    } else {
      try {
        const modelStr = JSON.stringify(JSON.parse(serializer.serialize(model)), null, 4);
        fs.writeFile(output, modelStr, 'utf8', (err) => {
          if (err) {
            throw err;
          }
          console.log('Kevoree model generated succefully from KevScript file');
          if (Object.keys(ctxVars).length > 0) {
            const ctxVarsStr = Object.keys(ctxVars).map((key) => {
              return key + '=' + ctxVars[key];
            }).join(', ');
            console.log('ctx vars: ' + ctxVarsStr);
          }
          console.log('kevs used: ' + input);
          console.log('model gen: ' + output);
        });
      } catch (err) {
        console.log(chalk.red('Unable to serialize generated model') + '\n' + err.stack);
      }
    }
  };

  fs.readFile(input, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    if (optimist.argv.c) {
      const loader = factory.createJSONLoader();
      fs.readFile(path.resolve(optimist.argv.c), 'utf8', (err, ctxModelSrc) => {
        if (err) {
          console.log(chalk.red('Unable to read context model file') + '\n' + err.stack);
          process.exit(1);
        } else {
          try {
            kevs.parse(data, loader.loadModelFromString(ctxModelSrc).get(0), ctxVars, kevscriptHandler);
          } catch (err) {
            console.log(chalk.red('Unable to load context model') + '\n' + err.stack);
            process.exit(1);
          }
        }
      });
    } else {
      kevs.parse(data, null, ctxVars, kevscriptHandler);
    }
  });
} else {
  console.log(optimist.help());
}
