const config = require('tiny-conf');
const kConst = require('kevoree-const');
const kevoree = require('kevoree-library').org.kevoree;

require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

const auth = require('../lib/auth');
const getOrUpdateTdef = require('../lib/get-or-update-tdef');
const getOrUpdateDU = require('../lib/get-or-update-du');

function genUrl() {
	const host = config.get('registry.host');
	const port = config.get('registry.port');
	const protocol = config.get('registry.ssl') ? 'https://' : 'http://';
	return protocol + host + ((port === 80) ? '' : ':' + port);
}

module.exports = function (grunt) {
	grunt.registerMultiTask(
		'kevoree_registry',
		'Grunt plugin to publish Kevoree models to a Kevoree Registry (you can use --registry.host, --registry.port and --registry.ssl to target an alternative registry).',
		function () {
			const done = this.async();

			// Merge task-specific and/or target-specific options with these defaults.
			const options = this.options({
				registry: {},
				user: {}
			});
			if (options.registry.hasOwnProperty('host')) {
				config.set('registry.host', options.registry.host);
			}
			if (options.registry.hasOwnProperty('port')) {
				config.set('registry.port', options.registry.port);
			}
			if (options.registry.hasOwnProperty('ssl')) {
				config.set('registry.ssl', options.registry.ssl);
			}
			if (options.registry.hasOwnProperty('oauth')) {
				if (options.registry.oauth.hasOwnProperty('client_secret')) {
					config.set('registry.oauth.client_secret', options.registry.oauth.client_secret);
				}
				if (options.registry.oauth.hasOwnProperty('client_id')) {
					config.set('registry.oauth.client_id', options.registry.oauth.client_id);
				}
			}
			if (options.user.hasOwnProperty('login')) {
				config.set('user.login', options.user.login);
			}
			if (options.user.hasOwnProperty('password')) {
				config.set('user.password', options.user.password);
			}

			// even after "conf" & "options" reading: if it misses something let's
			// use some default values
			if (!config.get('registry')) {
				// there is no registry conf
				config.set('registry', {
					host: 'registry.kevoree.org',
					port: 443,
					ssl: true,
					oauth: {
						client_secret: 'kevoree_registryapp_secret',
						client_id: 'kevoree_registryapp'
					}
				});
			} else {
				if (!config.get('registry.oauth')) {
					// there is no oauth conf
					config.set('registry.oauth', {
						client_secret: 'kevoree_registryapp_secret',
						client_id: 'kevoree_registryapp'
					});
				}
			}

			const url = genUrl();
			grunt.log.ok('Registry: ' + url.blue);

			auth(grunt)
				.then(() => {
					const factory = new kevoree.factory.DefaultKevoreeFactory();
					const loader = factory.createJSONLoader();

					if (this.files.length === 1) {
						const filepath = this.files[0].src[0];
						if (!grunt.file.exists(filepath)) {
							done(new Error('Model file "' + filepath + '" not found.'));
						} else {
							const modelStr = grunt.file.read(filepath);
							let model;
							try {
								model = loader.loadModelFromString(modelStr).get(0);
							} catch (err) {
								done(new Error('Unable to load model from file "' + filepath + '"'));
								return;
							}

							grunt.log.ok('Model:    ' + filepath.blue);
							const tdefs = model.select('**/typeDefinitions[]').array;
							if (!tdefs || tdefs.length > 1) {
								done(new Error('Model must define one TypeDefinition strictly (found: ' + tdefs.length + ')'));
								return;
							} else {
								const tdef = tdefs[0];
								getOrUpdateTdef(grunt, tdef, model)
									.then(() => {
										return getOrUpdateDU(grunt, tdef.eContainer().name, tdef, model);
									})
									.then(done)
									.catch(done);
							}
						}
					} else {
						done(new Error('You must specify one Kevoree model JSON file'));
					}
				})
				.catch((err) => {
					grunt.log.warn(err.message);
					done(new Error('Auth failed. Check your credentials'));
				});
		});
};
