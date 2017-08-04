/* globals KevoreeModuleLoader */

const pkg = require('./package.json');
const LocalChannel = require('./lib/LocalChannel');

KevoreeModuleLoader.register(pkg.name, pkg.version, LocalChannel);
