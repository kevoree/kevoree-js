var assert = require('assert');
var kevoree = require('kevoree-library');

var reducer = require('../lib/util/reducer');
var readModel = require('./util/readModel');

// setup
var factory = new kevoree.factory.DefaultKevoreeFactory();
var saver = factory.createJSONSerializer();

describe('reducer(model, master, client)', function () {
	this.slow(100);

	it('empty model', function () {
		var model = factory.createContainerRoot();
		var reducedModel = reducer(model, 'master', 'client');

		assert.equal(saver.serialize(model), saver.serialize(reducedModel));
	});

	it('does not remove unwanted props', function () {
		var model = readModel('simple-client.json');
		var reducedModel = reducer(model, 'node0', 'node1');

		var node0 = reducedModel.findNodesByID('node0');
		var node1 = reducedModel.findNodesByID('node1');
		assert.ok(node0);
		assert.ok(node0.typeDefinition);
		assert.equal(node0.typeDefinition.deployUnits.array.length, 1);
		assert.ok(node1);
		assert.ok(node1.typeDefinition);
		assert.equal(node1.typeDefinition.deployUnits.array.length, 1);
	});

	it('does not remove unwanted bindings', function () {
		var model = readModel('client-with-chan.json');
		var reducedModel = reducer(model, 'master', 'client');

		var client = reducedModel.findNodesByID('client');
		var ticker = client.findComponentsByID('ticker');
		assert.ok(ticker);
		assert.ok(ticker.typeDefinition);
		assert.equal(ticker.typeDefinition.deployUnits.array.length, 2);

		var printer = client.findComponentsByID('printer');
		assert.ok(printer);
		assert.ok(printer.typeDefinition);
		assert.equal(printer.typeDefinition.deployUnits.array.length, 2);

		var chan = reducedModel.findHubsByID('chan');
		assert.ok(chan);
		assert.ok(chan.typeDefinition);
		assert.equal(chan.typeDefinition.deployUnits.array.length, 2);

		assert.equal(reducedModel.mBindings.array.length, 2);

	});

	it('extraneous nodes are removed', function () {
		var model = readModel('ext-nodes.json');
		var reducedModel = reducer(model, 'node0', 'node2');

		assert.equal(reducedModel.findNodesByID('node1'), null);
	});

	it('extraneous channels are removed', function () {
		var model = readModel('ext-chans.json');
		var reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findHubsByID('chan'), null);
	});

	it('extraneous packages are removed', function () {
		var model = readModel('ext-pkgs.json');
		var reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findPackagesByID('tellu'), null);
	});

	it('extraneous bindings are removed', function (done) {
		var model = readModel('ext-bindings.json');
		var reducedModel = reducer(model, 'node0', 'node1');

		assert.equal(reducedModel.findHubsByID('extChan'), null);
		assert.equal(reducedModel.mBindings.array.length, 4);

		var sharedChan = reducedModel.findHubsByID('sharedChan');
		assert.equal(sharedChan.bindings.array.length, 2);
		assert.equal(sharedChan.bindings.array[0].port.eContainer().eContainer().name, 'node1');
		assert.equal(sharedChan.bindings.array[1].port.eContainer().eContainer().name, 'node2');
		done();
	});
});
