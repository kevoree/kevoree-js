const KevoreeModuleLoader = require('kevoree-module-loader');

const pkg = require('../package.json');
const ConsolePrinter = require('./browser/ConsolePrinterUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, ConsolePrinter);
