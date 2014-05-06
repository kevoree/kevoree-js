var WSServer = require('ws').Server,
    config   = require('./config'),
    argv     = require('minimist')(process.argv.slice(2));

var PUSH = 'push',
    PULL = 'pull';

var options = {
    port: argv.port || config.port,
    path: (function processPath(path) {
        if (path) {
            if (path.substr(0, 1) === '/') {
                return path;
            } else {
                return '/' + path;
            }
        }
        return '';
    })(argv.path || config.path)
};

var wss         = new WSServer(options),
    registered  = {};

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

function noAction(msg) {
    console.log('No action found for incoming message (%j)', msg);
}

wss.on('connection', function (ws) {
    ws.on('message', function (msg) {
        if (msg.type) msg = msg.data;

        try {
            // try to parse message as stringified JSON object
            msg = JSON.parse(msg);
            switch (msg.action) {
                case 'pullAnswer':
                    var client = wss.getClient(msg.id);
                    if (client) {
                        client.send(msg.model);
                    }
                    break;

                case 'register':
                    console.log('New client registered: '+msg.id);
                    registered[msg.id] = ws;
                    break;

                case 'send':
                    for (var i in msg.destIDs) {
                        var conn = registered[msg.destIDs[i]];
                        if (conn && conn.readyState === 1) {
                            conn.send(msg.message);
                        }
                    }
                    break;

                default:
                    noAction(msg);
                    break;
            }

        } catch (err) {
            // enable compatibility with Kevoree group protocol
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
            } else {
                noAction(msg);
            }
        }
    });

    ws.on('close', function () {
        for (var id in registered) {
            if (registered[id] === ws) {
                delete registered[id];
                console.log('Removed registered client: '+id);
            }
        }
    });
});

console.log('WebSocket server started on port %s with path %s', options.port, options.path);