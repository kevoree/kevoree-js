const kevoree = require('kevoree-library');
const api = require('kevoree-registry-client');
const diff = require('./diff');

function getOrUpdateTdef(grunt, tdef, model) {
	const factory = new kevoree.factory.DefaultKevoreeFactory();
	const cloner = factory.createModelCloner();
	const loader = factory.createJSONLoader();
	const compare = factory.createModelCompare();
	const serializer = factory.createJSONSerializer();

	let tdefStr, cleanTdef;
	try {
		const clonedModel = cloner.clone(model);
		cleanTdef = clonedModel.findByPath(tdef.path());
		cleanTdef.removeAllDeployUnits();
		tdefStr = serializer.serialize(cleanTdef).trim();
	} catch (err) {
		return Promise.reject(new Error('Unable to serialize TypeDefinition ' + tdef.name + '/' + tdef.version));
	}

	// if we reach this point, model serialization went well
	const namespace = tdef.eContainer().name;
	grunt.log.writeln();
	grunt.log.writeln('Looking for TypeDefinition ' + (namespace + '.' + tdef.name +
		'/' + tdef.version).bold + ' in the registry...');
	return api.tdef.getByNamespaceAndNameAndVersion(namespace, tdef.name, tdef.version)
		.then((tdef) => {
			grunt.log.ok('Found (id:' + tdef.id + ')');
			grunt.verbose.writeln();
			grunt.verbose.writeln('Loading model...');
			const regTdef = loader.loadModelFromString(tdef.model).get(0);
			// create a ContainerRoot for registry tdef
			const regModel = factory.createContainerRoot().withGenerated_KMF_ID(0);
			factory.root(regModel);
			const regPkg = factory.createPackage().withName(tdef.namespace);
			regModel.addPackages(regPkg);
			regPkg.addTypeDefinitions(regTdef);
			// create a ContainerRoot for src tdef
			const srcModel = factory.createContainerRoot().withGenerated_KMF_ID(0);
			factory.root(srcModel);
			const srcPkg = factory.createPackage().withName(tdef.namespace);
			srcModel.addPackages(srcPkg);
			srcPkg.addTypeDefinitions(cleanTdef);
			// diff the two models to ensure there are the same
			const traces = compare.diff(regModel, srcModel).traces.array;
			if (traces.length > 0) {
				// there is differences between local and registry: error
				diff(grunt, srcModel, regModel, traces);
				throw new Error('If you want to use your local changes then you have to increment your TypeDefinition version.');
			}
		})
		.catch((err) => {
			if (err.statusCode) {
				if (err.statusCode === 404) {
					// typeDef does not exist: create it
					grunt.log.warn('Not found, creating...');
					grunt.log.writeln();
					grunt.verbose.writeln('TypeDefinition Model: ' + JSON.stringify(JSON.parse(tdefStr), null, 2));
					return api.tdef.create(namespace, {
						name: tdef.name,
						version: tdef.version,
						model: tdefStr
					}).then((tdef) => {
						grunt.log.writeln();
						grunt.log.ok('Success:  ' + (namespace + '.' +
							tdef.name + '/' + tdef.version).bold + ' published on registry (id:' + tdef.id + ')');
					}).catch((err) => {
						grunt.log.writeln();
						if (err.statusCode === 401) {
							grunt.log.warn('You are not logged in');
						} else if (err.statusCode === 403) {
							grunt.log.warn('You are not a member of namespace "' + namespace + '"');
						} else if (err.statusCode === 404) {
							grunt.log.warn('Namespace "' + namespace + '" does not exist in the registry');
						} else {
							grunt.log.warn(err.message);
						}
						throw err;
					});
				} else {
					grunt.log.warn(err.message);
					throw new Error('Unable to create TypeDefinition.');
				}
			} else {
				throw err;
			}
		});
}

module.exports = getOrUpdateTdef;
