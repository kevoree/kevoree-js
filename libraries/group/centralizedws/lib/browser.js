const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('./package.json');
const WSGroup = require('./lib/CentralizedWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, WSGroup);
