var assert = require('assert');
var WebSocket = require('ws');
var kevoree = require('kevoree-library');

var InstanceMock = require('./util/InstanceMock');
var clientFactory = require('../lib/client');
var Protocol = require('../lib/protocol/Protocol');
var RegisterMessage = require('../lib/protocol/RegisterMessage');
// var PullMessage = require('../lib/protocol/PullMessage');

var PORT = 9000;

function noop() { /*noop*/ }
var logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

describe('client.create(logger, port, kCore)', function () {
	this.timeout(500);
	this.slow(200);

	var client;
	var server;
	var iMock;

	before('create instance mock', function () {
		iMock = new InstanceMock('node1', 'sync');
	});

	beforeEach('create WebSocket Server mock', function (done) {
		server = new WebSocket.Server({ port: PORT }, function () {
			client = clientFactory.create(logger, PORT, iMock, 'lo', 'ipv4');
			done();
		});
	});

	it('should register on server', function (done) {
		var simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var loader = factory.createJSONLoader();
		var model = loader.loadModelFromString(simpleClientModelStr).get(0);
		iMock.currentModel = model;

		server.on('connection', function (c) {
			c.on('message', function (msg) {
				var receivedMsg = Protocol.parse(msg);
				var expectedMsg = new RegisterMessage(iMock.nodeName, simpleClientModelStr);
				assert.equal(receivedMsg.getNodeName(), expectedMsg.getNodeName());
				// TODO compare model (but take care of re-ordering? => lodash.isEqual maybe?)
				done();
			});
		});
	});

	afterEach('close client if any', function (done) {
		if (client) {
			client.close();
		}
		setTimeout(function () {
			// give it a bit of time to properly close clients
			if (server) {
				server.close(done);
			} else {
				done();
			}
		}, 100);
	});
});
