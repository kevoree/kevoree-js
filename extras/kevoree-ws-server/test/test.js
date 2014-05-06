var WebSocket = require('ws');

var ws = new WebSocket('ws://127.0.0.1/sharedChan');

ws.onopen = function () {
	console.log("open");

	// try to register
	ws.send(JSON.stringify({
		action: 'register',
		id: 'some-id'
	}));
};

ws.onmessage = function (msg) {
	console.log('message', msg);
};

ws.onclose = function () {
	console.log("close");
};