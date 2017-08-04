
module.exports = function tagResolverFactory(logger, next) {
	const tdefsTags = {};
	const latestDUS = {};
	const releaseDUS = {};

	function getDUVersions(dus) {
		const duVersions = {};
		dus.forEach((du) => {
			duVersions[du.findFiltersByID('platform').value] = du.version;
		});
		return duVersions;
	}

	return {
		resolve: (fqn, model) => {
			let tdefChanged = false;
			let duChanged = false;

			return Promise.resolve().then(() => {
				const tdefTag = fqn.version.tdef;
				const duTag = fqn.version.du;
				if (tdefTag === 'LATEST') {
					const tdefVersion = tdefsTags[fqn.namespace + '.' + fqn.name];
					if (tdefVersion) {
						// found typeDef version in cache
						fqn.version.tdef = tdefVersion;
						logger.debug('TagResolver changed ' + fqn.namespace + '.' + fqn.name + '/LATEST to ' + fqn.namespace + '.' + fqn.name + '/' + tdefVersion);
						tdefChanged = true;
					}
				}

				if (fqn.version.tdef !== 'LATEST') {
					let duVersions;
					if (fqn.version.du === 'LATEST') {
						duVersions = latestDUS[fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef];
					}
					if (fqn.version.du === 'RELEASE') {
						duVersions = releaseDUS[fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef];
					}
					if (duVersions) {
						// found du versions in cache
						fqn.version.du = duVersions;
						logger.debug('TagResolver changed ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + '/' + duTag + ' to ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + '/' + JSON.stringify(fqn.version.du));
						duChanged = true;
					}
				}

				return next.resolve(fqn, model)
					.then((tdef) => {
						if (!tdefChanged && tdefTag === 'LATEST') {
							tdefsTags[fqn.namespace + '.' + fqn.name] = tdef.version;
							logger.debug('TagResolver linked ' + fqn.namespace + '.' + fqn.name + '/LATEST to ' + fqn.namespace + '.' + fqn.name + '/' + tdef.version);
						}

						if (!duChanged) {
							if (duTag === 'LATEST') {
								latestDUS[fqn.namespace + '.' + fqn.name + '/' + tdef.version] = getDUVersions(tdef.deployUnits.array);
								logger.debug('TagResolver linked ' + fqn + ' to ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + '/' + JSON.stringify(latestDUS[fqn.namespace + '.' + fqn.name + '/' + tdef.version]));
							} else if (duTag === 'RELEASE') {
								releaseDUS[fqn.namespace + '.' + fqn.name + '/' + tdef.version] = getDUVersions(tdef.deployUnits.array);
								logger.debug('TagResolver linked ' + fqn + ' to ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + '/' + JSON.stringify(releaseDUS[fqn.namespace + '.' + fqn.name + '/' + tdef.version]));
							}
						}
						return tdef;
					});
			});
		}
	};
};
