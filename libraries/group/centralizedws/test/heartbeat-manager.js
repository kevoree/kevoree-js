// testing client heartbeat manager
const assert = require('assert');
const WebSocket = require('ws');
const HeartBeatManager = require('../lib/util/heartbeat-manager');

const PORT = 8000;

describe('HeartBeatManager', function () {
	this.slow(300);

	let server;
	let client;

	beforeEach('start server', function () {
		server = new WebSocket.Server({ port: PORT });
	});

	afterEach('stop server', function () {
		client.close();
		server.close();
	});

	it('should answer ping request', function (done) {
		server.on('connection', function (client) {
			const hbManager = new HeartBeatManager(client, 50);
			let pingMsg;
			hbManager
				.on('ping', function (msg) {
					pingMsg = msg;
				})
				.on('pong', function (msg) {
					assert.equal(msg, pingMsg);
					hbManager.stop();
					done();
				});

			hbManager.start();
		});

		client = new WebSocket('ws://localhost:' + PORT);
	});

	it('should stop heartbeat process when client close connection', function (done) {
		server.on('connection', function (client) {
			const hbManager = new HeartBeatManager(client, 50);
			hbManager.on('stop', done);
			hbManager.start();
			setTimeout(function () {
				client.close();
			}, 70);
		});

		client = new WebSocket('ws://localhost:' + PORT);
	});
});
