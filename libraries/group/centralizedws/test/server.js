const assert = require('assert');
const kevoree = require('kevoree-library');
const WebSocket = require('ws');

const serverFactory = require('../lib/server');
const InstanceMock = require('./util/InstanceMock');
const Protocol = require('../lib/protocol/Protocol');
const RegisterMessage = require('../lib/protocol/RegisterMessage');
const RegisteredMessage = require('../lib/protocol/RegisteredMessage');

const PORT = 9000;

// setup
function noop() {/*noop*/}
const logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

describe('server.create(logger, port, kCore)', function () {
	this.timeout(500);
	this.slow(100);

	let server;
	let iMock;

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
		const client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			client.close();
			done();
		});
	});

	it('registered client is stored and receives "registered" ack', function (done) {
		this.slow(350);

		const simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		const factory = new kevoree.factory.DefaultKevoreeFactory();
		const loader = factory.createJSONLoader();
		const model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		const client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			const rMsg = new RegisterMessage('node1', simpleClientModelStr);
			client.send(rMsg.toRaw());
		});

		client.on('message', function (msg) {
			const pMsg = Protocol.parse(msg);
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

		const simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		const factory = new kevoree.factory.DefaultKevoreeFactory();
		const loader = factory.createJSONLoader();
		const model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		const client = new WebSocket('ws://localhost:' + PORT);
		client.on('open', function () {
			const rMsg = new RegisterMessage('node1', simpleClientModelStr);
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
