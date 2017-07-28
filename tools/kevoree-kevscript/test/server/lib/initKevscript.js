const os = require('os');
const path = require('path');
const config = require('tiny-conf');
const loggerFactory = require('kevoree-logger');
const tagResolverFactory = require('../../../lib/resolvers/tag-resolver-factory');
const modelResolverFactory = require('../../../lib/resolvers/model-resolver-factory');
const registryResolverFactory = require('../../../lib/resolvers/registry-resolver-factory');
const KevScript = require('../../../lib/KevScript');

config.set({
	registry: {
		host: 'localhost',
		port: 3000,
		ssl: false
	},
	cache: {
		root: path.resolve(os.tmpdir(), '_kevoree-test-cache_'),
		ttl: 86400000 // 24 hours
	}
});

const registryResolver = registryResolverFactory(loggerFactory.create('RegistryResolver'));
const modelResolver = modelResolverFactory(loggerFactory.create('ModelResolver'), registryResolver);
const rootResolver = tagResolverFactory(loggerFactory.create('TagResolver'), modelResolver);
const logger = loggerFactory.create('KevScript');

loggerFactory.remove('console');

module.exports = () => new KevScript(logger, { resolver: rootResolver });
