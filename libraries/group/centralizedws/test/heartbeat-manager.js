// testing client heartbeat manager
const assert = require('assert');
const WebSocket = require('ws');
const HeartBeatManager = require('../lib/util/heartbeat-manager');

const PORT = 8000;

describe('HeartBeatManager', function mochaDescribe() {
	this.slow(300);

	let server;
	let client;

	beforeEach('start server', () => {
		server = new WebSocket.Server({ port: PORT });
	});

	afterEach('stop server', () => {
		client.close();
		server.close();
	});

	it('should answer ping request', (done) => {
		server.on('connection', (client) => {
			const hbManager = new HeartBeatManager(client, 50);
			let pingMsg;
			hbManager
				.on('ping', (msg) => {
					pingMsg = msg;
				})
				.on('pong', (msg) => {
					assert.equal(msg, pingMsg);
					hbManager.stop();
					done();
				});

			hbManager.start();
		});

		client = new WebSocket('ws://localhost:' + PORT);
	});

	it('should stop heartbeat process when client close connection', (done) => {
		server.on('connection', (client) => {
			const hbManager = new HeartBeatManager(client, 50);
			hbManager.on('stop', done);
			hbManager.start();
			setTimeout(() => {
				client.close();
			}, 70);
		});

		client = new WebSocket('ws://localhost:' + PORT);
	});
});
