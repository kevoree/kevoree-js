// testing client heartbeat manager
var assert = require('assert');
var WebSocket = require('ws');
var HeartBeatManager = require('../lib/util/heartbeat-manager');

var PORT = 8000;

describe('HeartBeatManager', function () {
	this.slow(300);

	var server;
	var client;

	beforeEach('start server', function () {
		server = new WebSocket.Server({ port: PORT });
	});

	afterEach('stop server', function () {
		client.close();
		server.close();
	});

	it('should answer ping request', function (done) {
		server.on('connection', function (client) {
			var hbManager = new HeartBeatManager(client, 50);
			var pingMsg;
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
			var hbManager = new HeartBeatManager(client, 50);
			hbManager.on('stop', done);
			hbManager.start();
			setTimeout(function () {
				client.close();
			}, 70);
		});

		client = new WebSocket('ws://localhost:' + PORT);
	});
});
