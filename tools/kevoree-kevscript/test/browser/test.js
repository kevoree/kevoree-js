/* globals KevoreeKevscript, KevoreeCommons, TinyConf, expect, sinon */

const LS_PREFIX = 'kevs-cache-';

TinyConf.set({
	registry: {
		host: 'new-registry.kevoree.org',
		port: 443,
		ssl: true,
		oauth: {
			client_id: 'kevoree_registryapp',
			client_secret: 'kevoree_registryapp_secret'
		}
	},
	cache: {
		root: LS_PREFIX,
		ttl: 86400000 // 24 hours cache validity
	}
});

describe('KevScript tests', function mochaDescribe() {
	this.timeout(2500);

	let kevs, tagResolver, modelResolver, /*lsResolver,*/ registryResolver;

	before('init logger/resolvers/engine', () => {
		const logger = new KevoreeCommons.KevoreeLogger('KevScript');
		logger.setLevel('ALL');
		registryResolver = KevoreeKevscript.Resolvers.registryResolverFactory(logger);
		// lsResolver = KevoreeKevscript.Resolvers.lsResolverFactory(logger, registryResolver);
		modelResolver = KevoreeKevscript.Resolvers.modelResolverFactory(logger, registryResolver);
		tagResolver = KevoreeKevscript.Resolvers.tagResolverFactory(logger, modelResolver);
		kevs = new KevoreeKevscript(logger, {
			resolver: tagResolver
		});
	});

	after('clean localStorage', () => {
		// Object.keys(localStorage).forEach((key) => {
		// 	if (key.startsWith(LS_PREFIX)) {
		// 		delete localStorage[key];
		// 	}
		// });
	});

	beforeEach('init spies', () => {
		sinon.spy(tagResolver, 'resolve');
		sinon.spy(modelResolver, 'resolve');
		// sinon.spy(lsResolver, 'resolve');
		sinon.spy(registryResolver, 'resolve');
	});

	afterEach('restore spies', () => {
		tagResolver.resolve.restore();
		modelResolver.resolve.restore();
		// lsResolver.resolve.restore();
		registryResolver.resolve.restore();
	});

	it('execute \'add node0: JavascriptNode/LATEST/LATEST\'', (done) => {
		const script = 'add node0: JavascriptNode/LATEST/LATEST';

		kevs.parse(script, (err, model) => {
			if (err) {
				done(err);
			} else {
				expect(model).toExist();
				const node = model.findNodesByID('node0');
				expect(node).toExist();
				expect(node.typeDefinition).toExist();
				expect(node.typeDefinition.name).toEqual('JavascriptNode');
				expect(tagResolver.resolve.callCount).toEqual(1, 'tagResolver.resolve() should be hit once');
				expect(modelResolver.resolve.callCount).toEqual(1, 'modelResolver.resolve() should be hit once');
				// expect(lsResolver.resolve.callCount).toEqual(1, 'lsResolver.resolve() should be hit once');
				expect(registryResolver.resolve.callCount).toEqual(1, 'registryResolver.resolve() should be hit once');
				done();
			}
		});
	});

	// it('should not hit registry this time thanks to cache', (done) => {
	// 	var script = 'add node0: JavascriptNode/LATEST/LATEST';
  //
	// 	kevs.parse(script, (err, model) => {
	// 		if (err) {
	// 			done(err);
	// 		} else {
	// 			expect(model).toExist();
	// 			var node = model.findNodesByID('node0');
	// 			expect(node).toExist();
	// 			expect(node.typeDefinition).toExist();
	// 			expect(node.typeDefinition.name).toEqual('JavascriptNode');
	// 			expect(tagResolver.resolve.callCount).toEqual(1, 'tagResolver.resolve() should be hit once');
	// 			expect(modelResolver.resolve.callCount).toEqual(1, 'modelResolver.resolve() should be hit once');
	// 			// expect(lsResolver.resolve.callCount).toEqual(1, 'lsResolver.resolve() should be hit once');
	// 			expect(registryResolver.resolve.callCount).toEqual(0, 'registryResolver.resolve() should not be hit');
	// 			done();
	// 		}
	// 	});
	// });

	it('should end with a hit on registry resolver', (done) => {
		const script = 'add node0: JavascriptNode/LATEST/LATEST';

		kevs.parse(script, (err, model) => {
			if (err) {
				done(err);
			} else {
				expect(model).toExist();
				const node = model.findNodesByID('node0');
				expect(node).toExist();
				expect(node.typeDefinition).toExist();
				expect(node.typeDefinition.name).toEqual('JavascriptNode');
				expect(tagResolver.resolve.callCount).toEqual(1, 'tagResolver.resolve() should be hit once');
				expect(modelResolver.resolve.callCount).toEqual(1, 'modelResolver.resolve() should be hit once');
				// expect(lsResolver.resolve.callCount).toEqual(1, 'lsResolver.resolve() should be hit once');
				expect(registryResolver.resolve.callCount).toEqual(1, 'registryResolver.resolve() should be hit once');

				kevs.parse(script, model, (err, model) => {
					if (err) {
						done(err);
					} else {
						expect(model).toExist();
						const node = model.findNodesByID('node0');
						expect(node).toExist();
						expect(node.typeDefinition).toExist();
						expect(node.typeDefinition.name).toEqual('JavascriptNode');
						expect(tagResolver.resolve.callCount).toEqual(2, 'tagResolver.resolve() should be hit once');
						expect(modelResolver.resolve.callCount).toEqual(2, 'modelResolver.resolve() should be hit once');
						// expect(lsResolver.resolve.callCount).toEqual(1, 'lsResolver.resolve() should be hit once');
						expect(registryResolver.resolve.callCount).toEqual(1, 'registryResolver.resolve() should be hit once');
						done();
					}
				});
			}
		});
	});

	it('execute a bigger script', (done) => {
		let script = 'add node0: JavascriptNode/1/{js: "5.4.0-beta.9"}\n';
		script += 'add node0.ticker: Ticker/1/{js: "5.3.3-beta.2"}\n';
		script += 'add sync: CentralizedWSGroup/2/{js: "1.0.0-alpha.10"}\n\n';
		script += 'attach * sync\n\n';
		script += 'set sync.isMaster/node0 = "true"';

		kevs.parse(script, (err, model) => {
			if (err) {
				done(err);
			} else {
				expect(model).toExist();
				const node = model.findNodesByID('node0');
				expect(node).toExist();
				expect(node.typeDefinition).toExist();
				expect(node.typeDefinition.name).toEqual('JavascriptNode');

				const ticker = node.findComponentsByID('ticker');
				expect(ticker).toExist();
				expect(ticker.typeDefinition).toExist();
				expect(ticker.typeDefinition.name).toEqual('Ticker');

				const group = model.findGroupsByID('sync');
				expect(group).toExist();
				expect(group.typeDefinition).toExist();
				expect(group.typeDefinition.name).toEqual('CentralizedWSGroup');
				done();
			}
		});
	});
});
