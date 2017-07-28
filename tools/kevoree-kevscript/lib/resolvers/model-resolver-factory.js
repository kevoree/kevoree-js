var semver = require('semver');

module.exports = function modelResolverFactory(logger, next) {

	function findBestTdef(fqn, model) {
		var tdef = null;
    logger.debug('KevScript', 'ModelResolver is looking for ' + fqn + ' in model');
		var pkg = model.findPackagesByID(fqn.namespace);
		if (pkg) {
			var path = 'typeDefinitions[name=' + fqn.name;
			if (fqn.version.tdef === 'LATEST') {
				path += ']';
			} else {
				path += ',version=' + fqn.version.tdef + ']';
			}
			pkg.select(path).array
				.forEach(function (t) {
					// if they are multiple versions of a TypeDefinition
					// then we need the LATEST one
					// or the only one if a version has been specified
					if (tdef) {
						var t0 = parseInt(tdef.version, 10);
						var t1 = parseInt(t.version, 10);
						if (t0 < t1) {
							tdef = t;
						}
					} else {
						tdef = t;
					}
				});
		}
		return tdef;
	}

	function checkDUS(tdef, duVersions) {
		var satisfied = true;

		for (var platform in duVersions) {
			var found = false;
			for (var i=0; i < tdef.deployUnits.array.length; i++) {
				var du = tdef.deployUnits.array[i];
				var p = du.findFiltersByID('platform');
				if (p.value === platform && semver.satisfies(du.version, duVersions[platform])) {
					found = true;
					break;
				}
			}
			if (!found) {
				satisfied = false;
				break;
			}
		}

		return satisfied;
	}

	return {
		resolve: function (fqn, model) {
      var tdef = findBestTdef(fqn, model);
      if (tdef) {
        if (typeof fqn.version.du === 'object' && Object.keys(fqn.version.du).length > 0) {
          // deployUnit versions are set explicitly: check them
          if (checkDUS(tdef, fqn.version.du)) {
            logger.info('KevScript', 'Found ' + fqn + ' in model');
            return Promise.resolve(tdef);
          }
        }
      }

      // unable to find type in model: ask next resolver
      return next.resolve(fqn, model);
		}
	};
};
