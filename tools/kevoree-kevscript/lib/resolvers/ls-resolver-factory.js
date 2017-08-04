/* globals localStorage, KevoreeLibrary */
const config = require('tiny-conf');

module.exports = function lsResolverFactory(logger, next) {
	if (!KevoreeLibrary && !localStorage) {
		// prevent bad usage on Node.js
		logger.warn('KevScript', 'LocalStorageResolver cannot be used on this platform (no localStorage available)');
		return next;
	}

	const factory = new KevoreeLibrary.factory.DefaultKevoreeFactory();
	const loader = factory.createJSONLoader();
	const serializer = factory.createJSONSerializer();
	const compare = factory.createModelCompare();


	function getRootPath(fqn) {
		return (config.get('cache.root') || 'kevs-cache-') + fqn.namespace + '.' + fqn.name;
	}

	function getTdefPath(fqn) {
		return getRootPath(fqn) + '/' + fqn.version.tdef;
	}

	function getDUPath(fqn, platform, version) {
		return getRootPath(fqn) + '/' + fqn.version.tdef + '-' + platform + '-' + version;
	}

	function saveTdef(fqn, tdef) {
		const tdefPath = getTdefPath(fqn);
		const tdefModel = JSON.parse(serializer.serialize(tdef));
		tdefModel.deployUnits = [];
		localStorage.setItem(tdefPath, JSON.stringify(tdefModel));
	}

	function saveDeployUnit(fqn, du) {
		const duPath = getDUPath(fqn, du.findFiltersByID('platform').value, du.version);
		localStorage.setItem(duPath, serializer.serialize(du));
	}

	function saveDeployUnits(fqn, dus) {
		dus.forEach((du) => {
			saveDeployUnit(fqn, du);
		});
	}

	function readTdef(fqn) {
		try {
			const tdefPath = getTdefPath(fqn);
			const tdefModel = localStorage.getItem(tdefPath);
			const tdef = loader.loadModelFromString(tdefModel).get(0);
			const model = factory.createContainerRoot().withGenerated_KMF_ID('0');
			const pkg = factory.createPackage().withName(fqn.namespace);
			model.addPackages(pkg);
			pkg.addTypeDefinitions(tdef);
			return model;
		} catch (err) {
			logger.debug('KevScript', err.message + ' (ignored)');
			logger.debug('KevScript', err.stack);
		}

		return null;
	}

	function readDeployUnit(fqn, platform, version) {
		try {
			const duPath = getDUPath(fqn, platform, version);
			const duModel = localStorage.getItem(duPath);
			const models =  loader.loadModelFromString(duModel);
			const du = models.get(0);
			const model = factory.createContainerRoot().withGenerated_KMF_ID('0');
			const pkg = factory.createPackage().withName(fqn.namespace);
			model.addPackages(pkg);
			pkg.addDeployUnits(du);
			return model;
		} catch (err) {
			logger.debug('KevScript', err.message + ' (ignored)');
			logger.debug('KevScript', err.stack);
		}

		return null;
	}

	function readDeployUnits(fqn, versions) {
		return Object.keys(versions)
			.map((platform) => {
				return readDeployUnit(fqn, platform, versions[platform]);
			})
			.filter((model) => {
				// discard null/undefined model
				return Boolean(model);
			});
	}

	function askNext(fqn, model) {
		const emptyModel = factory.createContainerRoot();
		factory.root(emptyModel);

		return next.resolve(fqn, emptyModel)
			.then((tdef) => {
				// tdef has been resolved from registry
				// save it in filesystem
				saveTdef(fqn, tdef);
				saveDeployUnits(fqn, tdef.deployUnits.array);
				// TODO remove current tdefs DUs in order to use the resolved ones only?
				compare.merge(model, emptyModel).applyOn(model);
				return model.findByPath(tdef.path());
			});
	}

	return {
		resolve: (fqn, model) => {
			if (fqn.version.tdef === 'LATEST') {
				return askNext(fqn, model);
			} else {
				return Promise.resolve().then(() => {
					const tdefModel = readTdef(fqn);
					if (tdefModel) {
						// tdef found in filesystem: no need to hit registry for it
						// now looking for deployUnits
						if (typeof fqn.version.du === 'object') {
							// explicit versions specified
							const dusModel = readDeployUnits(fqn, fqn.version.du);
							if (dusModel && dusModel.length > 0) {
								// deployUnits found in filesystem
								// TODO remove current tdefs DUs in order to use the resolved ones only?
								compare.merge(model, tdefModel).applyOn(model);
								const tdef = model.findByPath(fqn.toKevoreePath());
								dusModel.forEach((duModel) => {
									if (duModel) {
										const du = duModel.packages.array[0].deployUnits.array[0];
										compare.merge(model, duModel).applyOn(model);
										tdef.addDeployUnits(model.findByPath(du.path()));
									}
								});
								logger.info('KevScript', 'Found ' + fqn + ' in localStorage');
								return tdef;
							} else {
								// unable to find deployUnits in filesystem cache
								return askNext(fqn, model);
							}
						} else {
							// LATEST | RELEASE => gotta hit registry to resolve those tags
							return askNext(fqn, model);
						}
					} else {
						return askNext(fqn, model);
					}
				});
			}
		}
	};
};
