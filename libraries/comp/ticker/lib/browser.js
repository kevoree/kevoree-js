const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const Ticker = require('./browser/TickerUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, Ticker);
