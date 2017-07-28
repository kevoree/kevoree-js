'use strict';

var path = require('path');
var fs = require('fs');
var kHash = require('kevoree-hash');
var npa = require('npm-package-arg');

/**
 *
 * @param moduleName           eg. kevoree-node-javascript@5.5.0 or /home/user/dev/libs/kevoree-node-javascript
 * @param modulePath           eg. /home/user/.kevoree/deploy_units/kevoree-node-javascript/5.5.0
 * @param hashcode             eg. 1c37d627771bf40f3563b8a28ad325d8
 * @param skipIntegrityCheck   eg. false
 * @param callback
 */
function exists(moduleName, modulePath, hashcode, skipIntegrityCheck, callback) {
	var parsed = npa(moduleName);
	if (parsed.type === 'local') {
		// module name is a path
		fs.readFile(path.resolve(moduleName, 'package.json'), 'utf8', function (err, data) {
			if (err) {
				if (err.code === 'ENOENT') {
					callback(null, false);
				} else {
					callback(err);
				}
			} else {
				var localPkg = JSON.parse(data);
				fs.readFile(path.resolve(modulePath, 'node_modules', localPkg.name, 'package.json'), 'utf8', function (err, data) {
					if (err) {
						if (err.code === 'ENOENT') {
							callback(null, false);
						} else {
							callback(err);
						}
					} else {
						var installedPkg = JSON.parse(data);
						callback(null, localPkg.version === installedPkg.version);
					}
				});
			}
		});
	} else {
		// module name looks "normal"
		var pkgJsonPath = [modulePath, 'node_modules'].concat(parsed.name.split('/')). // just in case module name is scoped
		concat(['package.json']);
		// using resolve.apply() because pkgJsonPath is an array here
		pkgJsonPath = path.resolve.apply(null, pkgJsonPath);
		fs.readFile(pkgJsonPath, 'utf8', function (err, data) {
			if (err) {
				if (err.code === 'ENOENT') {
					callback(null, false);
				} else {
					callback(err);
				}
			} else {
				var error;
				var result;
				var hashValues;
				try {
					var hash = kHash(path.join(pkgJsonPath, '..'));
					var pkg = JSON.parse(data);
					if (!skipIntegrityCheck) {
						if (hash === hashcode) {
							result = true;
						} else {
							result = true;
							hashValues = {
								local: hash,
								model: hashcode
							};
						}
					} else {
						if (pkg.version === parsed.spec) {
							result = true;
						} else {
							result = false;
						}
					}
				} catch (err) {
					error = err;
				}

				callback(error, result, hashValues);
			}
		});
	}
}

module.exports = exists;
