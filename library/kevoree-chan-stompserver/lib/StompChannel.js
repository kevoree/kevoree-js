// if you have already created your own Channel extending AbstractChannel
// you can replace AbstractChannel here and use your own
// ex: var MyChan = require('./path/to/MyChan')
// the only thing needed is that the top level channel extends AbstractChannel :)
var AbstractChannel = require('kevoree-entities').AbstractChannel,
    Stomp           = require('./stomp');

/**
 * Kevoree channel
 * @type {StompChannel}
 */
var StompChannel = AbstractChannel.extend({
    toString: 'StompChannel',

    construct: function () {
        this.client = null;
        this.connected = false;
        this.timeoutIDs = [];
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function () {
        this._super();

        var host  = this.dictionary.getValue('host');
        var port  = this.dictionary.getValue('serverPort');
        var topic = this.dictionary.getValue('topic') || '/';

        this.client = new Stomp.client('ws://'+host+':'+port);

        var that = this;

        var connectToServer = function () {
            var successCb = function () {
                this.clearTimeouts();

                this.client.subscribe(topic, function(message) {
                    that.localDispatch(message);
                });
            }.bind(this);

            var errorCb = function () {
                var timeoutID = setTimeout(connectToServer, 5000);
                this.timeoutIDs.push(timeoutID);
            }.bind(this);

            this.client.connect('', '', successCb, errorCb);
        }.bind(this);

        connectToServer();
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function () {
        this._super();
        if (this.client != null) {
            this.client.disconnect();
            this.client = null;
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
        this._super();
        var sendMessage = function () {
            if (this.client != null) {
                var topic = this.dictionary.getValue('topic') || '/';
                this.client.send(topic, { priority: 9 }, msg);
            } else {
                var timeoutID = setTimeout(sendMessage, 2000);
                this.timeoutIDs.push(timeoutID);
            }
        }.bind(this);

        sendMessage();
    },

    clearTimeouts: function () {
        // clear all pending timeouts
        for (var i in this.timeoutIDs) clearTimeout(this.timeoutIDs[i]);
        this.timeoutIDs.length = 0; // reset timeouts
    },

    dic_host: {
        optional: false
    },
    dic_serverPort: {
        optional: false
    },
    dic_topic: {
        optional: true,
        defaultValue: '/'
    },
    dic_login: {
        // TODO
    },
    dic_pass: {
        // TODO
    }
});

module.exports = StompChannel;
