const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const Twitter = require('./Twitter');

KevoreeModuleLoader.register(pkg.name, pkg.version, Twitter);
