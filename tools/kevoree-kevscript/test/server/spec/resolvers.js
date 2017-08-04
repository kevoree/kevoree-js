const assert = require('assert');
const Sinon = require('sinon');
const kevoree = require('kevoree-library');

// test utils
const loggerFactory = require('kevoree-logger');

// things to test
const FQN = require('../../../lib/util/fqn');
const tagResolverFactory = require('../../../lib/resolvers/tag-resolver-factory');
const modelResolverFactory = require('../../../lib/resolvers/model-resolver-factory');
const registryResolverFactory = require('../../../lib/resolvers/registry-resolver-factory');

describe('KevScript - resolvers', function mochaDescribe() {
	require('../init')(this);

	const factory = new kevoree.factory.DefaultKevoreeFactory();

	function emptyModel() {
		const model = factory.createContainerRoot();
		factory.root(model);
		return model;
	}

	let tagResolver, modelResolver, registryResolver;
	const model = emptyModel();

	before('initialize resolvers', () => {
		registryResolver = registryResolverFactory(loggerFactory.create('RegistryResolver'));
		modelResolver = modelResolverFactory(loggerFactory.create('ModelResolver'), registryResolver);
		tagResolver = tagResolverFactory(loggerFactory.create('TagResolver'), modelResolver);
    loggerFactory.remove('console');
	});

	beforeEach('initialize spies', () => {
		Sinon.spy(tagResolver, 'resolve');
		Sinon.spy(modelResolver, 'resolve');
		Sinon.spy(registryResolver, 'resolve');
	});

	afterEach('restore spies', () => {
		tagResolver.resolve.restore();
		modelResolver.resolve.restore();
		registryResolver.resolve.restore();
	});

	it('should hit registry', () => {
		return tagResolver.resolve(new FQN('kevoree', 'JavascriptNode'), model)
			.then((tdef) => {
				assert.equal(tdef.version, '42');
			});
	});

	it('should end with a hit to fs resolver on second resolving', () => {
		// this test should end with a hit in the fs on the second resolving
		// because on first hit, registry will answer, then fs/model/tag should
		// update accordingly with the data retrieved from registry
		return tagResolver.resolve(new FQN('kevoree', 'Ticker', {
				du: 'LATEST'
			}), model)
			.then((tdef) => {
				assert.equal(tdef.version, '1');
				// on second resolving, the tag LATEST will be resolved to the proper version
				// but because the model has been erased, the model resolver will be useless
				// but the fs has been updated previously, so the chain will stop on it
				return tagResolver.resolve(new FQN('kevoree', 'Ticker', {
						du: 'LATEST'
					}), emptyModel())
					.then((tdef) => {
						assert.equal(tdef.version, '1');

						// tag, model and fs resolvers should be used twice
						assert.equal(tagResolver.resolve.callCount, 2, 'tagResolver.resolve() should be hit twice');
						assert.equal(modelResolver.resolve.callCount, 2, 'modelResolver.resolve() should be hit twice');

						// registry resolver should be used for the second resolving
						assert.equal(registryResolver.resolve.callCount, 2, 'registryResolver.resolve() should be hit once');
					});
			});
	});

	it('should hit model resolver', () => {
		return tagResolver.resolve(new FQN('kevoree', 'JavascriptNode', { tdef: 42 }), model)
			.then((tdef) => {
				assert.equal(tdef.version, '42');

				assert.equal(tagResolver.resolve.callCount, 1, 'tagResolver.resolve() should be hit once');
				assert.equal(modelResolver.resolve.callCount, 1, 'modelResolver.resolve() should be hit once');

				// fs & registry resolvers should not be used
				assert.equal(registryResolver.resolve.callCount, 0, 'registryResolver.resolve() should not be hit');
			});
	});

	it('should hit registry because unable to find explicit du version in model', () => {
		return tagResolver.resolve(new FQN('kevoree', 'JavascriptNode', { tdef: 42, du: { js: '5.4.0-beta.0' } }), model)
			.then((tdef) => {
				assert.equal(tdef.version, '42');
				assert.equal(tdef.deployUnits.array[0].version, '5.4.0');

				assert.equal(tagResolver.resolve.callCount, 1, 'tagResolver.resolve() should be hit once');
				assert.equal(modelResolver.resolve.callCount, 1, 'modelResolver.resolve() should be hit once');
				assert.equal(registryResolver.resolve.callCount, 1, 'registryResolver.resolve() should be hit once');
			});
	});
});
