/* globals KevoreeModuleLoader */

const pkg = require('./package.json');
const WSGroup = require('./lib/CentralizedWSGroup');

KevoreeModuleLoader.register(pkg.name, pkg.version, WSGroup);
