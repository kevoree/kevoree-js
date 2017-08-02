// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// make sure config is the first thing set
require('../config/index');

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const kevoreeGenModel = require('kevoree-gen-model');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');
const printHeader = require('./util/print-header');
const formatWebpackMessages = require('./util/format-webpack-messages');

const appPkg = require(paths.appPackageJson);
printHeader('Generating Kevoree model', appPkg.name, appPkg.version);

kevoreeGenModel(paths.appPath, false, (err) => {
  if (err && err.message) {
    console.log(err.message);
    process.exit(1);
  } else {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBrowser);
    // Start the webpack build
    return browserBuild()
      .then(({ stats, warnings }) => {
          if (warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log(
              '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.'
            );
            console.log(
              'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n'
            );
          } else {
            console.log('--- stats ---');
            console.log(stats);
            console.log('-------------');
            console.log(chalk.green('Compiled successfully.\n'));
          }

          console.log();

          const buildFolder = path.relative(process.cwd(), paths.appBrowser);
          console.log('Browser module: ' + chalk.blue(buildFolder));
        },
        (err) => {
          console.log(chalk.red('Failed to compile.\n'));
          console.log(err.stack);
          process.exit(1);
        }
      );
  }
});

// Create the browser build
function browserBuild() {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({ stats, warnings: messages.warnings });
    });
  });
}
