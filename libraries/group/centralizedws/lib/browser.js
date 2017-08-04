const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const CentralizedWSGroup = require('./CentralizedWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, CentralizedWSGroup);
