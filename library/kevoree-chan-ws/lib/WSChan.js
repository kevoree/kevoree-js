var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WSBroker        = require('wsmsgbroker');

/**
 * Kevoree channel
 * @type {WSChan}
 */
var WSChan = AbstractChannel.extend({
    toString: 'WSChan',

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
        var host = this.dictionary.getString('host'),
            port = this.dictionary.getNumber('port'),
            path = this.dictionary.getString('path', '');

        if (host && port) {
            if (path.substr(0, 1) !== '/') {
                path = '/' + path;
            }

            this.getInputs().forEach(function (path) {
                this.createInputClient(path + '_' + this.getName(), null, true);
            }.bind(this));
            this.getOutputs().forEach(function (path) {
                this.createOutputClient(path + '_' + this.getName(), null, false);
            }.bind(this));

            done();
        } else {
            done(new Error(this.toString() + ' error: "'+this.getName()+'" has wrong attributes host:port ('+host+':'+port+')'));
        }
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     * @param done
     */
    stop: function (done) {
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
    },

    /**
     *
     * @param done
     */
    update: function (done) {
        this.stop(function () {
            this.start(done);
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
        destPortPaths = destPortPaths.map(function (path) {
            return path + '_' + this.getName();
        }.bind(this));

        var internalSend = function () {
            var conn = this.clients[fromPortPath+'_'+this.getName()];
            if (typeof callback === 'function') {
                conn.send(msg, destPortPaths, function (from, answer) {
                    var split = from.split('_');
                    callback(split[0], split[1], answer);
                });
            } else {
                conn.send(msg, destPortPaths);
            }
        }.bind(this);

        var conn = this.clients[fromPortPath+'_'+this.getName()];
        if (!conn) {
            this.createOutputClient(fromPortPath+'_'+this.getName(), internalSend);
        } else {
            internalSend();
        }
    },

    /**
     *
     * @param id
     * @param [callback]
     * @param [retry] boolean
     */
    createInputClient: function (id, callback, retry) {
        var errorTimeout, closeTimeout;
        var address = this.processAddress();

        var createClient = function () {
            var client = new WSBroker(id, address.host, address.port, address.path);
            client.on('message', function (msg, response) {
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
            client.on('error', function (err) {
                this.log.warn('Something went wrong with the connection of '+id+' (reason: '+err.message+')');
                if (retry === true) {
                    clearTimeout(errorTimeout);
                    errorTimeout = setTimeout(createClient, 3000);
                }
            }.bind(this));
            client.on('close', function () {
                delete this.clients[id];
                this.log.warn('Connection closed by remote server for '+id);
                if (retry === true) {
                    clearTimeout(closeTimeout);
                    closeTimeout = setTimeout(createClient, 3000);
                }
            }.bind(this));
            client.on('registered', function () {
                this.clients[id] = client;
                this.log.info(id+' registered on remote server');
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        }.bind(this);

        createClient();
    },

    /**
     *
     * @param id
     * @param [callback]
     * @param [retry] boolean
     */
    createOutputClient: function (id, callback, retry) {
        var errorTimeout, closeTimeout;
        var address = this.processAddress();

        var createClient = function () {
            var client = new WSBroker(id, address.host, address.port, address.path);
            client.on('error', function (err) {
                this.log.warn('Something went wrong with the connection of '+id+' (reason: '+err.message+')');
                if (retry === true) {
                    clearTimeout(errorTimeout);
                    errorTimeout = setTimeout(createClient, 3000);
                }
            }.bind(this));
            client.on('close', function () {
                this.log.warn('Connection closed by remote server for '+id);
                delete this.clients[id];
                if (retry === true) {
                    clearTimeout(closeTimeout);
                    closeTimeout = setTimeout(createClient, 3000);
                }
            }.bind(this));
            client.on('registered', function () {
                this.clients[id] = client;
                this.log.info(id+' registered on remote server');
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        }.bind(this);

        createClient();
    },

    /**
     *
     * @returns {{host: (String|*), port: (Number|*), path: (String|*)}}
     */
    processAddress: function () {
        var host = this.dictionary.getString('host'),
            port = this.dictionary.getNumber('port'),
            path = this.dictionary.getString('path', '');

        if (host && port) {
            if (path.substr(0, 1) !== '/') {
                path = '/' + path;
            }
        }
        return { host: host, port: port, path: path };
    }
});

module.exports = WSChan;
