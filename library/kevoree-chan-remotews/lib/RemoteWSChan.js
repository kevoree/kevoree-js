var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WSBroker        = require('wsmsgbroker');

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
        this.clients = {};
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

                var createInputClient = function (id) {
                    this.clients[id] = new WSBroker(id, host, port, path);
                    this.clients[id].on('message', function (msg, response) {
                        if (response) {
                            this.localDispatch(msg, function (err, res) {
                                if (err) {
                                    response.send(err.message);
                                } else {
                                    response.send(res);
                                }
                            });

                        } else {
                            this.localDispatch(msg);

                        }
                    }.bind(this));
                    this.clients[id].on('error', function (err) {
                        this.log.warn('Something went wrong with the connection of '+id+' (reason: '+err.message+')');
                        setTimeout(function () {
                            createInputClient(id);
                        }, 3000);
                    }.bind(this));
                    this.clients[id].on('close', function () {
                        this.log.warn('Connection closed by remote server for '+id);
                        setTimeout(function () {
                            createInputClient(id);
                        }, 3000);
                    }.bind(this));
                    this.clients[id].on('registered', function () {
                        this.log.info(id+' registered on remote server');
                    }.bind(this));
                }.bind(this);

                var createOutputClient = function (id) {
                    this.clients[id] = new WSBroker(id, host, port, path);
                    this.clients[id].on('error', function (err) {
                        this.log.warn('Something went wrong with the connection of '+id+' (reason: '+err.message+')');
                        setTimeout(function () {
                            createOutputClient(id);
                        }, 3000);
                    }.bind(this));
                    this.clients[id].on('close', function () {
                        this.log.warn('Connection closed by remote server for '+id);
                        setTimeout(function () {
                            createOutputClient(id);
                        }, 3000);
                    }.bind(this));
                    this.clients[id].on('registered', function () {
                        this.log.info(id+' registered on remote server');
                    }.bind(this));
                }.bind(this);

                this.getInputs().forEach(function (path) {
                    createInputClient(path+'_'+this.getName());
                }.bind(this));
                this.getOutputs().forEach(function (path) {
                    createOutputClient(path+'_'+this.getName());
                }.bind(this));

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
            for (var key in this.clients) {
                if (this.clients.hasOwnProperty(key)) {
                    var conn = this.clients[key];
                    if (conn && conn.readyState === 1) {
                        conn.close();
                    }
                }
            }
            this.clients = {};
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
     * @param callback
     */
    onSend: function (fromPortPath, destPortPaths, msg, callback) {
        // TODO issue #39
        destPortPaths = destPortPaths.map(function (path) {
            return path + '_' + this.getName();
        }.bind(this));

        var conn = this.clients[fromPortPath+'_'+this.getName()];
        if (callback instanceof Function) {
            conn.send(msg, destPortPaths, function (from, answer) {
                var split = from.split('_');
                callback(split[0], split[1], answer);
            });

        } else {
            conn.send(msg, destPortPaths);
        }
    }
});

module.exports = RemoteWSChan;
