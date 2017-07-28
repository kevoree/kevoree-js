/* globals KevoreeModuleLoader */

const pkg = require('./package.json');
const JavascriptNode = require('./lib/JavascriptNode');

KevoreeModuleLoader.register(pkg.name, pkg.version, JavascriptNode);
