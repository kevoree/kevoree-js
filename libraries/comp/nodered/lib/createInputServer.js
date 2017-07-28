var WebSocket = require('ws');
var WSBroadcast = require('ws-broadcast');

module.exports = function (port) {
    // create the kevoreeInput server
    var wss = new WSBroadcast(port);

    // connect a client to this broadcaster so we can send messages to it
    var ws = new WebSocket('ws://127.0.0.1:'+port);

    return {
        send: function (msg) {
            ws.send(msg);
        },
        close: function () {
            try {
                if (ws) { ws.close(); }
                if (wss) { wss.close(); }
            } catch (err) { /* ignore */ }
        },
        port: port
    };
};