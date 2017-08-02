const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const JavascriptNode = require('./JavascriptNode');

KevoreeModuleLoader.register(pkg.name, pkg.version, JavascriptNode);
