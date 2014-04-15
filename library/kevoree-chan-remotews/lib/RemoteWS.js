// if you have already created your own Channel extending AbstractChannel
// you can replace AbstractChannel here and use your own
// ex: var MyChan = require('./path/to/MyChan')
// the only thing needed is that the top level channel extends AbstractChannel :)
var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WebSocket = require('ws');

/**
 * Kevoree channel
 * @type {RemoteWS}
 */
var RemoteWS = AbstractChannel.extend({
    toString: 'RemoteWS',

    construct: function () {
        this.ws = null;
        this.timeoutIDs = [];
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function (_super) {
        _super.call(this);

        var host = this.dictionary.getValue('host');
        var port = this.dictionary.getValue('port');
        var topic = this.dictionary.getValue('topic') || '';
        if (typeof(host) == 'undefined' || host.length == 0 || typeof(port) == 'undefined' || port.length == 0)
            throw new Error('RemoteWS channel expects "host" & "port" attributes to be defined and valid.');

        var connectToRemoteServer = function () {
            this.ws = new WebSocket('ws://'+host+':'+port+'/'+topic);

            this.ws.onopen = function () {
                this.log.info(this.toString(), 'Successfully connected to remote server ws://'+host+':'+port+'/'+topic);

                this.clearTimeouts();
            }.bind(this);

            this.ws.onmessage = function (e) {
                var data = '';
                if (typeof(e) === 'string') data = e;
                else data = e.data;

                this.localDispatch(data);
            }.bind(this);

            this.ws.onclose = function () {
                this.log.info(this.toString(), 'Connection closed with remote server. Reconnecting in 5 seconds...');
                this.clearTimeouts();
                var timeoutID = setTimeout(connectToRemoteServer, 5000);
                this.timeoutIDs.push(timeoutID);
            }.bind(this);

            this.ws.onerror = function () {
                this.log.info(this.toString(), 'Something went wrong with connection to remote server ('+host+':'+port+'). Reconnecting in 5 seconds...');
                this.clearTimeouts();
                var timeoutID = setTimeout(connectToRemoteServer, 5000);
                this.timeoutIDs.push(timeoutID);
            }.bind(this);

        }.bind(this);

        connectToRemoteServer();
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function () {
        if (this.ws != null) {
            this.ws.close();
            this.ws = null;
        }
    },

    /**
     * When a channel is bound with an output port this method will be called 'n' times
     * when this output port will send a message ('n' corresponding to the number of input port
     * connected to this channel)
     * @param fromPortPath
     * @param destPortPaths
     * @param msg
     */
    onSend: function (fromPortPath, destPortPaths, msg) {
        var sendMessage = function () {
            if (this.ws != null) {
                if (this.ws.readyState == 1) { // open according to http://dev.w3.org/html5/websockets/
                    this.ws.send(msg);
                    return;
                }
            }
            // we are not currently connected to remote server, wait a little and try again
            var timeoutID = setTimeout(sendMessage, 2000);
            this.timeoutIDs.push(timeoutID);
        }.bind(this);

        sendMessage();
    },

    clearTimeouts: function () {
        // clear all pending timeouts
        for (var i in this.timeoutIDs) clearTimeout(this.timeoutIDs[i]);
        this.timeoutIDs.length = 0; // reset timeouts
    },

    dic_host: {
        optional: false,
        fragmentDependant: false
    },

    dic_port: {
        optional: false,
        fragmentDependant: false
    },

    dic_topic: {
        optional: true,
        fragmentDependant: false
    }
});

module.exports = RemoteWS;
