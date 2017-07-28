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

const kevoreeGenModel = require('kevoree-gen-model');
const paths = require('../config/paths');
const printHeader = require('./util/print-header');

const appPkg = require(paths.appPackageJson);
printHeader('Generating Kevoree model', appPkg.name, appPkg.version);

kevoreeGenModel(paths.appPath, false, (err) => {
  let status = 0;
  if (err && err.message) {
    status = 1;
    console.log(err.message);
  }
  process.exit(status);
});
