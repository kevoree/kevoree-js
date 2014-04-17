var config   = require('../config'),
    WSServer = require('ws').Server,
    rimraf   = require('rimraf'),
    path     = require('path');

var noop = function () {};

/**
 * Created by leiko on 17/04/14.
 */
function ClientCleaner() {
    var server = new WSServer({port: config.clientCleaner.port});
    var clients = {};

    server.on('connection', function (ws) {
        ws.on('message', function (msg) {
            if (msg.startsWith('register')) {
                clients[ws] = msg.substr('register'.length, msg.length-1); // register client uuid
            }
        });

        ws.on('close', function () {
            var uuid = clients[ws];
            rimraf(path.resolve(config.paths.npmInstallDir(uuid), '..'), noop);
        })
    });
}


module.exports = new ClientCleaner();