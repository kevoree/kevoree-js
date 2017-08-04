const assert = require('assert');
const kevoree = require('kevoree-library');

const reducer = require('../lib/util/reducer');
const readModel = require('./util/readModel');

// setup
const factory = new kevoree.factory.DefaultKevoreeFactory();
const saver = factory.createJSONSerializer();

describe('reducer(model, master, client)', function mochaDescribe() {
	this.slow(100);

	it('empty model', () => {
		const model = factory.createContainerRoot();
		const reducedModel = reducer(model, 'master', 'client');

		assert.equal(saver.serialize(model), saver.serialize(reducedModel));
	});

	it('does not remove unwanted props', () => {
		const model = readModel('simple-client.json');
		const reducedModel = reducer(model, 'node0', 'node1');

		const node0 = reducedModel.findNodesByID('node0');
		const node1 = reducedModel.findNodesByID('node1');
		assert.ok(node0);
		assert.ok(node0.typeDefinition);
		assert.equal(node0.typeDefinition.deployUnits.array.length, 1);
		assert.ok(node1);
		assert.ok(node1.typeDefinition);
		assert.equal(node1.typeDefinition.deployUnits.array.length, 1);
	});

	it('does not remove unwanted bindings', () => {
		const model = readModel('client-with-chan.json');
		const reducedModel = reducer(model, 'master', 'client');

		const client = reducedModel.findNodesByID('client');
		const ticker = client.findComponentsByID('ticker');
		assert.ok(ticker);
		assert.ok(ticker.typeDefinition);
		assert.equal(ticker.typeDefinition.deployUnits.array.length, 2);

		const printer = client.findComponentsByID('printer');
		assert.ok(printer);
		assert.ok(printer.typeDefinition);
		assert.equal(printer.typeDefinition.deployUnits.array.length, 2);

		const chan = reducedModel.findHubsByID('chan');
		assert.ok(chan);
		assert.ok(chan.typeDefinition);
		assert.equal(chan.typeDefinition.deployUnits.array.length, 2);

		assert.equal(reducedModel.mBindings.array.length, 2);

	});

	it('extraneous nodes are removed', () => {
		const model = readModel('ext-nodes.json');
		const reducedModel = reducer(model, 'node0', 'node2');

		assert.equal(reducedModel.findNodesByID('node1'), null);
	});

	it('extraneous channels are removed', () => {
		const model = readModel('ext-chans.json');
		const reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findHubsByID('chan'), null);
	});

	it('extraneous packages are removed', () => {
		const model = readModel('ext-pkgs.json');
		const reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findPackagesByID('tellu'), null);
	});

	it('extraneous bindings are removed', (done) => {
		const model = readModel('ext-bindings.json');
		const reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findHubsByID('extChan'), null);
		assert.equal(reducedModel.mBindings.array.length, 4);

		const sharedChan = reducedModel.findHubsByID('sharedChan');
		assert.equal(sharedChan.bindings.array.length, 2);
		assert.equal(sharedChan.bindings.array[0].port.eContainer().eContainer().name, 'node1');
		assert.equal(sharedChan.bindings.array[1].port.eContainer().eContainer().name, 'node2');
		done();
	});
});
