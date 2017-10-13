const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const ChartUI = require('./browser/ChartUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, ChartUI);
