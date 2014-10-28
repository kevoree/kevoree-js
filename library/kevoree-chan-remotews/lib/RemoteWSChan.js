var AbstractChannel = require('kevoree-entities').AbstractChannel,
    SmartSocket     = require('smart-socket');

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
            var host = this.dictionary.getString('host'),
                port = this.dictionary.getNumber('port'),
                path = this.dictionary.getString('path', '');

            if (host && port) {
                if (path.substr(0, 1) !== '/') {
                    path = '/' + path;
                }

                this.ss = new SmartSocket({
                    addresses:  [host + ':' + port + path],
                    loopBreak: 3000
                });

                this.ss.on('open', function (ws) {
                    this.log.info(this.toString(), '"'+this.getName()+'" connected to remote WebSocket server '+ws.url);
                    this.conn = ws;
                    this.getInputs().forEach(function (input) {
                        ws.send(JSON.stringify({
                            action: 'register',
                            id:     input
                        }));
                    });
                }.bind(this));

                this.ss.on('close', function (ws) {
                    this.log.info(this.toString(), '"'+this.getName()+'" lost connection with remote WebSocket server '+ws.url);
                }.bind(this));

                this.ss.on('message', function (ws, msg) {
                    if (msg.type) {
                        msg = msg.data;
                    }
                    this.localDispatch(msg);
                }.bind(this));

                this.ss.start();
                done();
            } else {
                done(new Error(this.toString() + ' error: "'+this.getName()+'" has wrong attributes host:port ('+host+':'+port+')'));
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
            this.stop(function () {
                this.start(done);
            }.bind(this));
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
        if (this.conn && this.conn.readyState === 1) {
            this.logDisplayed = false; // reset logDisplayed flag in order to re-show logs for the next disconnection
            this.conn.send(JSON.stringify({
                action: 'send',
                message: msg+'',
                dest: destPortPaths
            }));
        } else {
            if (!this.logDisplayed) {
                this.log.info(this.toString(), 'Connection is not active yet. Dropping messages for '+destPortPaths);
                this.logDisplayed = true;
            }
        }
    }
});

module.exports = RemoteWSChan;
