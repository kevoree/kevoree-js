/* globals KevoreeModuleLoader */

var pkg = require('./package.json');
var RemoteWSGroup = require('./lib/RemoteWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, RemoteWSGroup);
