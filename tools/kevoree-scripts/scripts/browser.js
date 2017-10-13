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

const PORT = 8080;

const chalk = require('chalk');
const express = require('express');
const paths = require('../config/paths');
const printHeader = require('./util/print-header');

const appPkg = require(paths.appPackageJson);

console.log();
printHeader('Starting Kevoree Browser Tester', appPkg.name, appPkg.version);

const app = express();
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: paths.resolveOwn('browser-tester') } );
  });
app.use(express.static(paths.resolveOwn('browser-tester')));
app.use('/app', express.static(paths.appPath));

const server = app.listen(PORT, 'localhost', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Open your browser at: ' + chalk.blue(`http://localhost:${PORT}`));
    console.log();
  }
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    if (server) {
      server.close();
    }
    process.exit(0);
  });
});
