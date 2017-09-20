const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const MsgSenderUI = require('./browser/MsgSenderUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, MsgSenderUI);
