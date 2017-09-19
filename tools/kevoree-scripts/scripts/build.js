// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// make sure config is the first thing set
require('../config/index');

const fs = require('fs-extra');
const path = require('path');
const eslint = require('eslint');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('lodash.merge');
const kevoreeGenModel = require('kevoree-gen-model');
const paths = require('../config/paths');
const eslintConfig = require('../config/eslintrc');
const printHeader = require('./util/print-header');
const formatWebpackMessages = require('./util/format-webpack-messages');

const appPkg = require(paths.appPackageJson);
printHeader('Linting sources', appPkg.name, appPkg.version);
const eslintCli = new eslint.CLIEngine(eslintConfig);
const formatter = eslintCli.getFormatter();
console.log('Linting: ' + chalk.blue([paths.appSrc, paths.appTest].map((p) => path.relative(process.cwd(), p)).join(', ')));
const lintReport = eslintCli.executeOnFiles([paths.appSrc, paths.appTest]);
if (lintReport.errorCount === 0 && lintReport.warningCount === 0) {
  console.log(chalk.green('Your code rocks.') + '\n');
} else {
  console.log(formatter(lintReport.results) + '\n');
  process.exit(1);
}

printHeader('Generating Kevoree model', appPkg.name, appPkg.version);
kevoreeGenModel(paths.appPath, false, (err) => {
  if (err && err.message) {
    console.log(err.message);
    process.exit(1);
  } else {
    if (appPkg.kevoree.browser) {
      console.log();
      const webpackConfig = require('../config/webpack.config');
      printHeader('Generating browser bundle', appPkg.name, appPkg.version);

      // merge default webpack config with optional custom conf
      let conf;
      try {
        const customConf = require(paths.appWebpackConf);
        conf = merge({}, webpackConfig, customConf);
      } catch (ignore) {
        conf = webpackConfig;
      }

      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(conf.output.path);

      // Start the webpack build
      console.log();
      return browserBuild(conf)
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
              console.log(stats.toString({ colors: true }));
              console.log();
              console.log(chalk.green('Compiled successfully') + '\n');
            }
          },
          (err) => {
            console.log(chalk.red('Failed to compile.\n'));
            console.log(err.stack);
            process.exit(1);
          }
        );
    }
  }
});

// Create the browser build
function browserBuild(config) {
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
      return resolve({ stats, warnings: messages.warnings });
    });
  });
}
