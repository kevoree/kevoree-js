var WebSocket = require('ws');

module.exports = function (port) {
    var wss = new WebSocket.Server({ port: port });
    var onMessage = function (msg) { /* noop */ };
    wss.on('connection', function (client) {
        client.on('message', function (msg) {
            onMessage(msg);
        });

        client.on('close', function () {
            client.removeAllListeners();
        });
    });
    return {
        onMessage: function (callback) {
            onMessage = callback;
        },
        close: function () {
            try {
                wss.close();
            } catch (err) { /* ignore */ }
        },
        port: port
    };
};