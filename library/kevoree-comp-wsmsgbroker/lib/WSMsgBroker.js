var AbstractComponent = require('kevoree-entities').AbstractComponent;
var WebSocket = require('ws');
var chalk = require('chalk');

/**
 * Kevoree component
 * @type {WSMsgBroker}
 */
var WSMsgBroker = AbstractComponent.extend({
    toString: 'WSMsgBroker',

    dic_port: { optional: false, datatype: 'number' },
    dic_path: { },

    construct: function () {
        this.id2ws = {};
        this.ws2id = {};
    },

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
    start: function (done) {
        this._super(function () {
            var port = this.dictionary.getNumber('port');
            if (port) {
                var path = this.dictionary.getString('path', '');
                if (path.substr(0, 1) !== '/') {
                    path = '/' + path;
                }

                this.server = new WebSocket.Server({ port: port, path: path });
                this.log.info(this.toString(), '"'+this.getName()+'" listen on 0.0.0.0:'+port+path);

                this.server.on('connection', function (ws) {
                    ws.on('message', function (msg) {
                        if (typeof msg === 'object') { msg = msg.data; }

                        try {
                            msg = JSON.parse(msg);
                            var action = require('./actions/'+msg.action);
                            if (action) {
                                try {
                                    action(this)(ws, msg);
                                } catch (err) {
                                    this.log.error(this.toString(), '"'+this.getName()+'" '+err.message);
                                }
                            } else {
                                this.log.error(this.toString(), '"'+this.getName()+'" malformed action "'+msg.action+'"');
                            }
                        } catch (err) {
                            if (err.code === 'MODULE_NOT_FOUND') {
                                this.log.warn(this.toString(), '"'+this.getName()+'" unknown action "'+msg.action+'"');
                            } else {
                                this.log.error(this.toString(), '"'+this.getName()+'" unable to parse message (only support JSON-encoded messages)');
                            }
                        }
                    }.bind(this));

                    ws.on('close', function () {
                        this.unregister(ws);
                    }.bind(this));
                }.bind(this));
                done();

            } else {
                done(new Error('You must set a value to "'+this.getName()+'.port"'));
            }
        }.bind(this));
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
    stop: function (done) {
        this._super(function () {

            try {
                this.server.close();
            } catch (ignore) {
                // no one care if this fails
            } finally {
                this.server = null;
            }

            this.id2ws = {};
            this.ws2id = {};

            done();
        }.bind(this));
    },

    update: function (done) {
        this._super(function () {
            this.stop(function () {
                this.start(done);
            }.bind(this));
        }.bind(this));
    },

    send: function (id, message) {
        var ws = this.id2ws[id];
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    },

    /**
     * Register a WebSocket client on the server
     * @param {String} id
     * @param {WebSocket} ws
     */
    register: function (id, ws) {
        this.id2ws[id] = ws;
        this.ws2id[ws] = id;
        this.log.info(this.toString(), '"'+this.getName()+'" '+chalk.green('+')+' '+id);
    },

    /**
     * Unregister a WebSocket client from server
     * @param {WebSocket} ws
     */
    unregister: function (ws) {
        var id = this.ws2id[ws];
        if (id) {
            delete this.ws2id[ws];
            delete this.id2ws[id];
            this.log.info(this.toString(), '"'+this.getName()+'" '+chalk.yellow('-')+' '+id);
        }
    }
});

module.exports = WSMsgBroker;
