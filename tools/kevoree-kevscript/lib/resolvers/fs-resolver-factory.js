const path = require('path');
const kevoree = require('kevoree-library');
const config = require('tiny-conf');
const fs = require('../util/promisified-fs');

module.exports = function fsResolverFactory(logger, next) {
  logger.warn('FileSystemResolver', 'This is deprecated. You should not use it');
	const factory = new kevoree.factory.DefaultKevoreeFactory();
	const loader = factory.createJSONLoader();
	const serializer = factory.createJSONSerializer();
	const compare = factory.createModelCompare();

	function getRootPath(fqn) {
		return path.resolve(config.get('cache.root'), fqn.namespace, fqn.name);
	}

	function getTdefPath(fqn) {
		return path.resolve(getRootPath(fqn), fqn.version.tdef + '', 'type.json');
	}

	function getDUPath(fqn, platform, version) {
		return path.resolve(getRootPath(fqn), fqn.version.tdef + '', platform, version + '.json');
	}

	function saveTdef(fqn, tdef) {
		const tdefPath = getTdefPath(fqn);
		return fs.mkdirp(path.resolve(tdefPath, '..'))
			.then(() => {
				const tdefModel = JSON.parse(serializer.serialize(tdef));
				tdefModel.deployUnits = [];
				return fs.writeFile(tdefPath, JSON.stringify(tdefModel, null, 2), 'utf-8')
					.then(() => {
						logger.debug('KevScript', 'FileSystemResolver cached ' + tdefPath);
					})
					.catch((err) => {
						logger.debug('KevScript', 'FileSystemResolver failed to cache ' + root + ' (ignored)');
						logger.debug('KevScript', err.stack);
					});
			})
			.catch((err) => {
				logger.debug('KevScript', 'FileSystemResolver failed to create directory ' + path.resolve(tdefPath, '..') + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function saveDeployUnit(fqn, du) {
		const duPath = getDUPath(fqn, du.findFiltersByID('platform').value, du.version);
		return fs.mkdirp(path.resolve(duPath, '..'))
			.then(() => {
				const duModelStr = JSON.stringify(JSON.parse(serializer.serialize(du)), null, 2);
				return fs.writeFile(duPath, duModelStr, 'utf-8')
					.then(() => {
						logger.debug('KevScript', 'FileSystemResolver cached ' + duPath);
					})
					.catch((err) => {
						logger.debug('KevScript', 'FileSystemResolver failed to cache ' + root + ' (ignored)');
						logger.debug('KevScript', err.stack);
					});
			})
			.catch((err) => {
				logger.debug('KevScript', 'FileSystemResolver failed to create directory ' + path.resolve(duPath, '..') + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function saveDeployUnits(fqn, dus) {
		return Promise.all(dus.map((du) => {
			return saveDeployUnit(fqn, du);
		}));
	}

	function readTdef(fqn) {
		const tdefPath = getTdefPath(fqn);
		return fs.readFile(tdefPath, 'utf-8')
			.then((tdefModel) => {
				const tdef = loader.loadModelFromString(tdefModel).get(0);
				const model = factory.createContainerRoot().withGenerated_KMF_ID('0');
				const pkg = factory.createPackage().withName(fqn.namespace);
				model.addPackages(pkg);
				pkg.addTypeDefinitions(tdef);
				return model;
			})
			.catch((err) => {
				logger.debug('KevScript', err.message + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function readDeployUnit(fqn, platform, version) {
		const duPath = getDUPath(fqn, platform, version);
		return fs.readFile(duPath, 'utf-8')
			.then((duModel) => {
				const du = loader.loadModelFromString(duModel).get(0);
				const model = factory.createContainerRoot().withGenerated_KMF_ID('0');
				const pkg = factory.createPackage();
				pkg.name = fqn.namespace;
				model.addPackages(pkg);
				pkg.addDeployUnits(du);
				return model;
			})
			.catch((err) => {
				logger.debug('KevScript', err.message + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function readDeployUnits(fqn, versions) {
		return Promise
			.all(Object.keys(versions)
				.map((platform) => {
					return readDeployUnit(fqn, platform, versions[platform]);
				}))
			.then((results) => {
				return results.filter((res) => {
					return Boolean(res);
				});
			});
	}

	function askNext(fqn, model) {
		const emptyModel = factory.createContainerRoot();
		factory.root(emptyModel);

		return next.resolve(fqn, emptyModel)
			.then((tdef) => {
				// tdef has been resolved from registry
				// save it in filesystem
				return saveTdef(fqn, tdef)
					.then(() => {
						return saveDeployUnits(fqn, tdef.deployUnits.array);
					})
					.then(() => {
						// TODO remove current tdefs DUs in order to use the resolved ones only?
						compare.merge(model, emptyModel).applyOn(model);
						return model.findByPath(tdef.path());
					});
			});
	}

	return {
		resolve: (fqn, model) => {
			if (fqn.version.tdef === 'LATEST') {
				return askNext(fqn, model);
			} else {
				return Promise.resolve()
					.then(() => {
						return readTdef(fqn);
					})
					.then((tdefModel) => {
						if (tdefModel) {
							// tdef found in filesystem: no need to hit registry for it
							// now looking for deployUnits
							if (typeof fqn.version.du === 'object') {
								// explicit versions specified
								return readDeployUnits(fqn, fqn.version.du)
									.then((dusModel) => {
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
											logger.info('KevScript', 'Found ' + fqn + ' in filesystem');
											return tdef;
										} else {
											// unable to find deployUnits in filesystem cache
											return askNext(fqn, model);
										}
									});
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
