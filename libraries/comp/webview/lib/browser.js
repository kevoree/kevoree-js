const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const Webview = require('./browser/WebviewUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, Webview);
