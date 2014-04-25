var WSServer = require('ws').Server,
    config   = require('./config');

var PUSH = 'push',
    PULL = 'pull';

var wss = new WSServer({
    port: config.port,
    path: (function processPath(path) {
        if (path) {
            if (path.substr(0, 1) === '/') {
                return path;
            } else {
                return '/' + path;
            }
        }
        return '';
    })(config.path)
});

/**
 * Broadcast "data" over all connected clients
 * @param data data to broadcast
 * @param client [optional] if set, broadcast to all but this one
 */
wss.broadcast = function (data, client) {
    for (var i in this.clients) {
        if (this.clients[i] !== client) {
            this.clients[i].send(data);
        }
    }
};

wss.getClient = function (id) {
    for (var i in this.clients) {
        if (this.clients[i].upgradeReq.headers['sec-websocket-key'] === id) {
            return this.clients[i];
        }
    }
};

wss.on('connection', function (ws) {
    ws.on('message', function (msg) {
        if (msg.type) msg = msg.data;

        try {
            msg = JSON.parse(msg);
            switch (msg.action) {
                case 'pullAnswer':
                    var client = wss.getClient(msg.id);
                    if (client) {
                        client.send(msg.model);
                    }
                    break;
            }

        } catch (err) {
            if (msg.substr(0, PUSH.length) === PUSH) {
                var model = msg.substr('push'.length+1);
                wss.broadcast(JSON.stringify({
                    action: 'push',
                    model: model
                }), ws);

            } else if (msg.substr(0, PULL.length) === PULL) {
                if (wss.clients.length > 0) {
                    wss.clients[0].send(JSON.stringify({
                        action: 'pull',
                        id: ws.upgradeReq.headers['sec-websocket-key']
                    }));
                } else {
                    ws.send(JSON.stringify({
                        action: 'error',
                        message: 'No connected client to pull model from'
                    }));
                }
            }
        }
    });
});