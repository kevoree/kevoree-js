/* globals KevoreeModuleLoader */

var pkg = require('./package.json');
var WSGroup = require('./lib/CentralizedWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, WSGroup);
