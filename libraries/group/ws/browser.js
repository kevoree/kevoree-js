/* globals KevoreeModuleLoader */

var pkg = require('./package.json');
var WSGroup = require('./lib/WSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, WSGroup);
