// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// make sure config is the first thing set
const config = require('../config/index');

const fs = require('fs');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const kHash = require('kevoree-hash');
const kConst = require('kevoree-const');
const kevoree = require('kevoree-library');
const KevScript = require('kevoree-kevscript');
const KevoreeCore = require('kevoree-core');
const NPMResolver = require('kevoree-resolvers/lib/NPMResolver');
const paths = require('../config/paths');
const checkRequiredFiles = require('./util/check-required-files');
const printHeader = require('./util/print-header');
const loggerFactory = require('kevoree-logger');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appModel, paths.appKevs])) {
  process.exit(1);
}

const appPkg = require(paths.appPackageJson);

// ============================================
//             CHECKSUM & INSTALL
// ============================================
const moduleHash = kHash(paths.appPath);
const installedModuleRootPath = path.join(kConst.DUS_PATH, appPkg.name, appPkg.version);
const installedModulePath = path.join(installedModuleRootPath, 'node_modules', appPkg.name);
printHeader('Installing', appPkg.name, appPkg.version);
// console.log(chalk.gray('DeployUnits path:') + ' ' + installedModuleRootPath);
let installedModuleHash, isInstalled = false;
try {
  installedModuleHash = kHash(installedModulePath);
  isInstalled = true;
} catch (ignore) {
  /* this error means the module is not even installed */
}
if (moduleHash !== installedModuleHash) {
  if (isInstalled) {
    console.log('Module has been updated and needs to be re-installed');
  }
  // need to (re-)install
  const installResult = spawn.sync(
    'npm',
    ['install', paths.appPath, '--silent', '--production', '--prefix=' + installedModuleRootPath],
    { stdio: ['ignore', 'ignore', process.stderr] }
  );
  if (installResult.signal) {
    if (installResult.signal === 'SIGKILL') {
      console.log(
        'The install failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
      );
    } else if (installResult.signal === 'SIGTERM') {
      console.log(
        'The install failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
      );
    }
    process.exit(1);
  } else {
    console.log(chalk.green('Installation succeed') + '\n');
  }
} else {
  console.log('Already ' + chalk.green('installed') + ' and ' + chalk.green('up-to-date') + '\n');
}

// ============================================
//              STARTING KEVOREE
// ============================================
printHeader('Starting Kevoree', appPkg.name, appPkg.version);
const logger = loggerFactory.create('Runtime');
logger.info(`Kevoree NodeJS [PID:${process.pid}@${os.hostname()}]`);
// create a KevScript engine
const kevs = new KevScript(loggerFactory.create('KevScript'));
const script = fs.readFileSync(paths.appKevs, 'utf-8');
const modelStr = fs.readFileSync(paths.appModel, 'utf-8');
const factory = new kevoree.factory.DefaultKevoreeFactory();
const model = factory.createJSONLoader().loadModelFromString(modelStr).get(0);
const ctxVars = undefined;

// create an npm resolver
const resolver = new NPMResolver(kConst.GLOBAL_PATH, loggerFactory.create('NPMResolver'), config.get('skipIntegrityCheck'));

// create a Kevoree core
const core = new KevoreeCore(resolver, kevs, loggerFactory);

['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    if (sig === 'SIGINT') {
      console.log(); // new line after ^C
      logger.info('Shutting down Kevoree... (SIGINT)');
    }
    if (sig === 'SIGTERM') {
      logger.info('Shutting down Kevoree... (SIGTERM)');
    }
    core.stop()
      .then(() => logger.info('Bye.'))
      .catch((err) => {
        if (err && err.message) {
          console.log(err.message);
        }
        process.exit(1);
      });
  });
});

// interpret the given KevScript
kevs.parse(script, model, ctxVars)
  .then(({ model, warnings }) => {
    warnings.forEach((warning) => logger.warn('KevScript', warning));
    core.start(config.get('node.name'));
    return core.deploy(model)
      .catch((err) => {
        logger.error(err.message);
        logger.info('Bye.');
      });
  })
  .catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  });
