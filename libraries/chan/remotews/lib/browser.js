const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const RemoteWSChan = require('./RemoteWSChan');

KevoreeModuleLoader.register(pkg.name, pkg.version, RemoteWSChan);
