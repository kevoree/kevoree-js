/* globals KevoreeModuleLoader */

var pkg = require('../../package.json');
var ConsolePrinter = require('./ConsolePrinterUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, ConsolePrinter);
