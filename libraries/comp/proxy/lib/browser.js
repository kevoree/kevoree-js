const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const Proxy = require('./Proxy');

KevoreeModuleLoader.register(pkg.name, pkg.version, Proxy);
