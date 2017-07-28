/* globals KevoreeModuleLoader */
const pkg = require('../../package.json');
const Ticker = require('./TickerUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, Ticker);
