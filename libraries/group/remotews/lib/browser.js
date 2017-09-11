const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const RemoteWSGroup = require('./RemoteWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, RemoteWSGroup);
