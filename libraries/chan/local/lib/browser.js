const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const LocalChannel = require('./LocalChannel');

KevoreeModuleLoader.register(pkg.name, pkg.version, LocalChannel);
