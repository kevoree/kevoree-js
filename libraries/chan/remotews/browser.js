/* globals KevoreeModuleLoader */

var pkg = require('./package.json');
var RemoteWSChan = require('./lib/RemoteWSChan');

KevoreeModuleLoader.register(pkg.name, pkg.version, RemoteWSChan);
