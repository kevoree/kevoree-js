var AbstractChannel = require('kevoree-entities').AbstractChannel,
    SmartSocket     = require('smart-socket');

var TIMEOUT = 2000;

/**
 * Kevoree channel
 * @type {RemoteWSChan}
 */
var RemoteWSChan = AbstractChannel.extend({
    toString: 'RemoteWSChan',

    dic_host: {
        optional: false,
        update: function () {
            this.stop();
            this.start();
        }
    },

    dic_port: {
        optional: false,
        datatype: 'number',
        update: function () {
            this.stop();
            this.start();
        }
    },

    dic_path: {
        optional: false,
        update: function () {
            this.stop();
            this.start();
        }
    },

    construct: function () {
        this.ss = null;
        this.conn = null;
        this.logDisplayed = false;
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function (_super) {
        _super.call(this);

        var address = (function (host, port, path) {
            if (!isNaN(parseInt(port))) {
                if (path) {
                    if (path.substr(0, 1) !== '/') {
                        path = '/' + path;
                    }
                } else {
                    path = '';
                }

                return host + ':' + port + path;
            } else {
                throw new Error(this.toString() + ' error: "'+this.getName()+'" port attribute is not a number ('+port+')');
            }
        }.bind(this))(this.dic_host.value, this.dic_port.value, this.dic_path.value);

        this.ss = new SmartSocket({
            addresses:  [address],
            timeout:    TIMEOUT,
            handlers: {
                onopen: function (ws) {
                    this.log.info(this.toString(), '"'+this.getName()+'" connected to remote WebSocket server ws://'+address);
                    this.conn = ws;
                    var pattern = 'nodes['+this.getNodeName()+']';
                    for (var path in this.inputs) {
                        if (path.substr(0, pattern.length) === pattern) {
                            this.conn.send(JSON.stringify({
                                action: 'register',
                                id: path
                            }));
                        }
                    }
                }.bind(this),

                onmessage: function (ws, msg) {
                    if (msg.type) msg = msg.data;

                    this.localDispatch(msg);
                }.bind(this),

                onclose: function () {
                    this.log.info(this.toString(), '"'+this.getName()+'" lost connection with remote WebSocket server ws://'+address+'. Retry every '+TIMEOUT+'ms');
                }.bind(this)
            }
        });

        this.ss.start();
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function () {
        if (this.ss) {
            this.ss.stop();
        }
        this.conn = null;
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
        if (this.conn && this.conn.readyState === 1) {
            this.logDisplayed = false; // reset logDisplayed flag in order to re-show logs for the next disconnection
            this.conn.send(JSON.stringify({
                action: 'send',
                message: msg,
                destIDs: destPortPaths
            }));
        } else {
            if (!this.logDisplayed) {
                this.log.debug(this.toString(), 'Connection is not active yet. Dropping messages for '+destPortPaths);
                this.logDisplayed = true;
            }
        }
    }
});

module.exports = RemoteWSChan;
