var path = require('path');
var kevoree = require('kevoree-library');
var config = require('tiny-conf');
var fs = require('../util/promisified-fs');

module.exports = function fsResolverFactory(logger, next) {
  logger.warn('FileSystemResolver', 'This is deprecated. You should not use it');
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var loader = factory.createJSONLoader();
	var serializer = factory.createJSONSerializer();
	var compare = factory.createModelCompare();

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
		var tdefPath = getTdefPath(fqn);
		return fs.mkdirp(path.resolve(tdefPath, '..'))
			.then(function () {
				var tdefModel = JSON.parse(serializer.serialize(tdef));
				tdefModel.deployUnits = [];
				return fs.writeFile(tdefPath, JSON.stringify(tdefModel, null, 2), 'utf-8')
					.then(function () {
						logger.debug('KevScript', 'FileSystemResolver cached ' + tdefPath);
					})
					.catch(function (err) {
						logger.debug('KevScript', 'FileSystemResolver failed to cache ' + root + ' (ignored)');
						logger.debug('KevScript', err.stack);
					});
			})
			.catch(function (err) {
				logger.debug('KevScript', 'FileSystemResolver failed to create directory ' + path.resolve(tdefPath, '..') + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function saveDeployUnit(fqn, du) {
		var duPath = getDUPath(fqn, du.findFiltersByID('platform').value, du.version);
		return fs.mkdirp(path.resolve(duPath, '..'))
			.then(function () {
				var duModelStr = JSON.stringify(JSON.parse(serializer.serialize(du)), null, 2);
				return fs.writeFile(duPath, duModelStr, 'utf-8')
					.then(function () {
						logger.debug('KevScript', 'FileSystemResolver cached ' + duPath);
					})
					.catch(function (err) {
						logger.debug('KevScript', 'FileSystemResolver failed to cache ' + root + ' (ignored)');
						logger.debug('KevScript', err.stack);
					});
			})
			.catch(function (err) {
				logger.debug('KevScript', 'FileSystemResolver failed to create directory ' + path.resolve(duPath, '..') + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function saveDeployUnits(fqn, dus) {
		return Promise.all(dus.map(function (du) {
			return saveDeployUnit(fqn, du);
		}));
	}

	function readTdef(fqn) {
		var tdefPath = getTdefPath(fqn);
		return fs.readFile(tdefPath, 'utf-8')
			.then(function (tdefModel) {
				var tdef = loader.loadModelFromString(tdefModel).get(0);
				var model = factory.createContainerRoot().withGenerated_KMF_ID('0');
				var pkg = factory.createPackage().withName(fqn.namespace);
				model.addPackages(pkg);
				pkg.addTypeDefinitions(tdef);
				return model;
			})
			.catch(function (err) {
				logger.debug('KevScript', err.message + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function readDeployUnit(fqn, platform, version) {
		var duPath = getDUPath(fqn, platform, version);
		return fs.readFile(duPath, 'utf-8')
			.then(function (duModel) {
				var du = loader.loadModelFromString(duModel).get(0);
				var model = factory.createContainerRoot().withGenerated_KMF_ID('0');
				var pkg = factory.createPackage();
				pkg.name = fqn.namespace;
				model.addPackages(pkg);
				pkg.addDeployUnits(du);
				return model;
			})
			.catch(function (err) {
				logger.debug('KevScript', err.message + ' (ignored)');
				logger.debug('KevScript', err.stack);
			});
	}

	function readDeployUnits(fqn, versions) {
		return Promise
			.all(Object.keys(versions)
				.map(function (platform) {
					return readDeployUnit(fqn, platform, versions[platform]);
				}))
			.then(function (results) {
				return results.filter(function (res) {
					return Boolean(res);
				});
			});
	}

	function askNext(fqn, model) {
		var emptyModel = factory.createContainerRoot();
		factory.root(emptyModel);

		return next.resolve(fqn, emptyModel)
			.then(function (tdef) {
				// tdef has been resolved from registry
				// save it in filesystem
				return saveTdef(fqn, tdef)
					.then(function () {
						return saveDeployUnits(fqn, tdef.deployUnits.array);
					})
					.then(function () {
						// TODO remove current tdefs DUs in order to use the resolved ones only?
						compare.merge(model, emptyModel).applyOn(model);
						return model.findByPath(tdef.path());
					});
			});
	}

	return {
		resolve: function (fqn, model) {
			if (fqn.version.tdef === 'LATEST') {
				return askNext(fqn, model);
			} else {
				return Promise.resolve()
					.then(function () {
						return readTdef(fqn);
					})
					.then(function (tdefModel) {
						if (tdefModel) {
							// tdef found in filesystem: no need to hit registry for it
							// now looking for deployUnits
							if (typeof fqn.version.du === 'object') {
								// explicit versions specified
								return readDeployUnits(fqn, fqn.version.du)
									.then(function (dusModel) {
										if (dusModel && dusModel.length > 0) {
											// deployUnits found in filesystem
											// TODO remove current tdefs DUs in order to use the resolved ones only?
											compare.merge(model, tdefModel).applyOn(model);
											var tdef = model.findByPath(fqn.toKevoreePath());
											dusModel.forEach(function (duModel) {
												if (duModel) {
													var du = duModel.packages.array[0].deployUnits.array[0];
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
