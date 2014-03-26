var AbstractCommand = require('./AbstractCommand'),
    Kevscript       = require('kevoree-kevscript');

/**
 * Created by leiko on 12/03/14.
 */
var Bootstrap = AbstractCommand.extend({
    toString: 'Bootstrap',

    construct: function (runtime, resolver) {
        this.kevscript = new Kevscript({
            resolvers: {
                npm: resolver
            }
        });
    },

    execute: function (nodeName, callback) {
        var grpName = 'sync';
        var port = 9000;
        var kevsModel = '' +
            'include npm:kevoree-node-javascript:latest' + '\n' +
            'include npm:kevoree-group-websocket:latest' + '\n' +
            'add '+nodeName+' : JavascriptNode' + '\n' +
            'add '+grpName+' : WebSocketGroup' + '\n' +
            'attach '+nodeName+' '+grpName + '\n' +
            'set '+grpName+'.port/'+nodeName+' = "'+port+'"' + '\n' +
            'network '+nodeName+'.lan.ip 127.0.0.1';

        this.kevscript.parse(kevsModel, function (err, model) {
            return callback(err, model);
        });
    }
});

module.exports = Bootstrap;