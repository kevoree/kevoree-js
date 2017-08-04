const assert = require('assert');
const WebSocket = require('ws');
const kevoree = require('kevoree-library');

const InstanceMock = require('./util/InstanceMock');
const clientFactory = require('../lib/client');
const Protocol = require('../lib/protocol/Protocol');
const RegisterMessage = require('../lib/protocol/RegisterMessage');
// var PullMessage = require('../lib/protocol/PullMessage');

const PORT = 9000;

function noop() { /*noop*/ }
const logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

describe('client.create(logger, port, kCore)', function mochaDescribe() {
	this.timeout(500);
	this.slow(200);

	let client;
	let server;
	let iMock;

	before('create instance mock', () => {
		iMock = new InstanceMock('node1', 'sync');
	});

	beforeEach('create WebSocket Server mock', (done) => {
		server = new WebSocket.Server({ port: PORT }, () => {
			client = clientFactory.create(logger, PORT, iMock, 'lo', 'ipv4');
			done();
		});
	});

	it('should register on server', (done) => {
		const simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		const factory = new kevoree.factory.DefaultKevoreeFactory();
		const loader = factory.createJSONLoader();
		const model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		server.on('connection', (c) => {
			c.on('message', (msg) => {
				const receivedMsg = Protocol.parse(msg);
				const expectedMsg = new RegisterMessage(iMock.nodeName, simpleClientModelStr);
				assert.equal(receivedMsg.getNodeName(), expectedMsg.getNodeName());
				// TODO compare model (but take care of re-ordering? => lodash.isEqual maybe?)
				done();
			});
		});
	});

	afterEach('close client if any', (done) => {
		if (client) {
			client.close();
		}
		setTimeout(() => {
			// give it a bit of time to properly close clients
			if (server) {
				server.close(done);
			} else {
				done();
			}
		}, 100);
	});
});
