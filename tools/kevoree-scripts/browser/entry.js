const KevoreeModuleLoader = require('kevoree-module-loader');

const path = require('path');
const paths = require('../config/paths');
const pkg = require(paths.appPackageJson);
const Type = require(path.join(paths.appPath, pkg.main));

KevoreeModuleLoader.register(pkg.name, pkg.version, Type);
