const kevoree = require('kevoree-library');
const api = require('kevoree-registry-client');

function getOrUpdateDU(grunt, namespace, tdef, model) {
	const dus = model.select('**/deployUnits[]').array;
	if (!dus || dus.length !== 1) {
		return Promise.reject(new Error('Model must define one DeployUnit strictly (found: ' + dus.length + ')'));
	} else {
		let duModelStr;
		try {
			const factory = new kevoree.factory.DefaultKevoreeFactory();
			const serializer = factory.createJSONSerializer();
			const cloner = factory.createModelCloner();
			const clonedModel = cloner.clone(model);
			const tdefFound = clonedModel.findByPath(tdef.path());
			tdefFound.delete();
			duModelStr = serializer.serialize(clonedModel).trim();
		} catch (err) {
			return Promise.reject(err);
		}

		const du = dus[0];
		const platform = du.findFiltersByID('platform').value;
		grunt.log.writeln();
		grunt.log.writeln('Looking for DeployUnit ' + (du.name + '/' + du.version + '/' + platform).bold + ' in the registry ...');
		return api.du.getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace, tdef.name, tdef.version, du.name, du.version, platform)
			.then((du) => {
				grunt.log.ok('Found (id:' + du.id + '), updating...');
				du.model = duModelStr;
				grunt.log.writeln();
				return api.du.update(du)
					.then((du) => {
						grunt.log.ok('Success:  ' + (du.name + '/' + du.version + '/' + du.platform).bold + ' updated on registry (id: ' + du.id + ')');
					})
					.catch((err) => {
						grunt.log.warn(err.message);
						throw new Error('Unable to update DeployUnit.');
					});
			})
			.catch((err) => {
				if (err.statusCode) {
					if (err.statusCode === 404) {
						grunt.log.warn('Not found, creating...');
						grunt.log.writeln();
						return api.du.create(namespace, tdef.name, tdef.version, {
							name: du.name,
							version: du.version,
							platform: platform,
							model: duModelStr
						}).then((du) => {
							grunt.log.ok('Success:  ' + (du.name + '/' + du.version + '/' + du.platform).bold + ' published on registry (id: ' + du.id + ')');
						}).catch((err) => {
							grunt.log.warn(err.message);
							throw new Error('Unable to create DeployUnit.');
						});
					} else {
						grunt.log.warn(err.message);
						throw new Error('Something went wrong while trying to find DeployUnit on registry.');
					}
				} else {
					throw err;
				}
			});
	}
}

module.exports = getOrUpdateDU;
