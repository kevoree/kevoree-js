var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var pkgHash = require('pkg-hash');

function depsToStr(pkg) {
	var deps = pkg.dependencies || {};
	Object.keys(pkg.optionalDependencies || {}).forEach(function(name) {
		delete deps[name];
	});
	return Object.keys(deps).sort().reduce(function(str, key) {
		return str + key + ':' + deps[key];
	}, '');
}

module.exports = function kHash(pkgPath) {
	var pHash;

	try {
		pHash = pkgHash(pkgPath);
	} catch (err) {
		err.message = 'Unable to retrieve module\'s hash reading sources';
		throw err;
	}

	var pkgData = fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf8');
	var pkg = JSON.parse(pkgData);
	if (pkg.kevoree && pkg.kevoree.namespace) {
		return crypto
			.createHash('md5')
			.update(pHash + pkg.kevoree.namespace + pkg.name + pkg.version + depsToStr(pkg))
			.digest('hex');
	} else {
		throw new Error('The project at "'+pkgPath+'" has no "kevoree.namespace"');
	}
};
