var AbstractChannel = require('kevoree-entities').AbstractChannel,
    SmartSocket     = require('smart-socket'),
    async           = require('async');

/**
 * Kevoree channel
 * @type {RemoteWSChan}
 */
var RemoteWSChan = AbstractChannel.extend({
    toString: 'RemoteWSChan',

    dic_host: { optional: false },
    dic_port: { optional: false, datatype: 'number' },
    dic_path: { optional: false },

    construct: function () {
        this.ss = null;
        this.conn = null;
        this.logDisplayed = false;
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     * @param done
     */
    start: function (done) {
        this._super(function () {
            var host = this.dictionary.getValue('host'),
                port = this.dictionary.getValue('port'),
                path = this.dictionary.getValue('path');

            if (!isNaN(parseInt(port))) {
                if (path) {
                    if (path.substr(0, 1) !== '/') {
                        path = '/' + path;
                    }
                } else {
                    path = '';
                }

                this.ss = new SmartSocket({
                    addresses:  [host + ':' + port + path],
                    handlers: {
                        onopen: function (ws) {
                            this.log.info(this.toString(), '"'+this.getName()+'" connected to remote WebSocket server ws://'+host + ':' + port + path);
                            this.conn = ws;
                            var pattern = 'nodes['+this.getNodeName()+']';
                            for (var p in this.inputs) {
                                if (p.substr(0, pattern.length) === pattern) {
                                    this.conn.send(JSON.stringify({
                                        action: 'register',
                                        id: p
                                    }));
                                }
                            }
                        }.bind(this),

                        onmessage: function (ws, msg) {
                            if (msg.type) msg = msg.data;

                            this.localDispatch(msg);
                        }.bind(this),

                        onclose: function () {
                            this.log.info(this.toString(), '"'+this.getName()+'" lost connection with remote WebSocket server ws://'+host + ':' + port + path);
                        }.bind(this)
                    }
                });

                this.ss.start();
                done();
            } else {
                done(new Error(this.toString() + ' error: "'+this.getName()+'" port attribute is not a number ('+port+')'));
            }
        }.bind(this));
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     * @param done
     */
    stop: function (done) {
        this._super(function () {
            if (this.ss) {
                this.ss.stop();
            }
            this.conn = null;
            done();
        }.bind(this));
    },

    /**
     *
     * @param done
     */
    update: function (done) {
        this._super(function () {
            async.series([
                function (cb) { this.stop(cb);  }.bind(this),
                function (cb) { this.start(cb); }.bind(this)
            ], done);
        }.bind(this));
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
