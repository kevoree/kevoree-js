var assert = require('assert');
var kevoree = require('kevoree-library');
var WebSocket = require('ws');

var serverFactory = require('../lib/server');
var InstanceMock = require('./util/InstanceMock');
var Protocol = require('../lib/protocol/Protocol');
var RegisterMessage = require('../lib/protocol/RegisterMessage');
var RegisteredMessage = require('../lib/protocol/RegisteredMessage');

var PORT = 9000;

// setup
function noop() {/*noop*/}
var logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

describe('server.create(logger, port, kCore)', function () {
	this.timeout(500);
	this.slow(100);

	var server;
	var iMock;

	before('create instance mock', function () {
		iMock = new InstanceMock('node0', 'sync');
	});

	beforeEach('create server on port ' + PORT, function () {
		server = serverFactory.create(logger, PORT, iMock);
	});

	afterEach('close server', function () {
		iMock.currentModel = null;
		server.close(iMock);
	});

	it('server is reachable', function (done) {
		var client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			client.close();
			done();
		});
	});

	it('registered client is stored and receives "registered" ack', function (done) {
		this.slow(350);

		var simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var loader = factory.createJSONLoader();
		var model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		var client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			var rMsg = new RegisterMessage('node1', simpleClientModelStr);
			client.send(rMsg.toRaw());
		});

		client.on('message', function (msg) {
			var pMsg = Protocol.parse(msg);
			switch (pMsg.getType()) {
				case RegisteredMessage.TYPE:
					assert.equal(Object.keys(serverFactory.client2name).length, 1);
					assert.equal(serverFactory.client2name[Object.keys(serverFactory.client2name)[0]], 'node1');
					client.close();
					done();
					break;
			}
		});
	});

	it('client closed is removed from registered store', function (done) {
		this.slow(500);

		var simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var loader = factory.createJSONLoader();
		var model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		var client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			var rMsg = new RegisterMessage('node1', simpleClientModelStr);
			client.send(rMsg.toRaw());

			// give the server the time to process the request
			setTimeout(function () {
				client.close();
				setTimeout(function () {
					assert.equal(Object.keys(serverFactory.client2name).length, 0);
					done();
				}, 100);
			}, 100);
		});
	});

	it('unpingable client should be unregistered', function () {
		// TODO this is not easily testable ? (maybe by unblackboxing the register/pull/push commands)
	});
});
