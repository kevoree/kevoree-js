/* globals KevoreeModuleLoader */

var pkg = require('./package.json');
var LocalChannel = require('./lib/LocalChannel');

KevoreeModuleLoader.register(pkg.name, pkg.version, LocalChannel);
