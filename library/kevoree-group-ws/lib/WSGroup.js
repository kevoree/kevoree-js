// Created by leiko on 02/10/14 11:47
var AbstractGroup = require('kevoree-entities').AbstractGroup;
var kevoree = require('kevoree-library').org.kevoree;
var WebSocket = require('ws');
var WebSocketServer = require('ws').Server;
var SmartSocket = require('smart-socket');
var ClientHandler = require('./ClientHandler');
var Protocol = require('./Protocol');
var PushMessage = require('./message/PushMessage');
var RegisterMessage = require('./message/RegisterMessage');

/**
 * Kevoree group
 */
var WSGroup = AbstractGroup.extend({
    toString: 'WSGroup',

    dic_master: { },
    dic_port:   { fragmentDependant: true, defaultValue: 9000 },

    construct: function () {
        this.server = null;
        this.client = null;
        this.clientHandler = new ClientHandler(this);
        this.count = 0;
    },

    start: function (done) {
        if (this.hasMaster()) {
            if (this.isMaster()) {
                this.createServer();
            } else {
                this.createClient();
            }
        } else {
            this.createServer();
        }
        this.count++;
        done();
    },

    stop: function (done) {
        // clear server
        try {
            this.server.close();
        } catch (ignore) {
            /* prevent not running server to throw err */
        } finally {
            this.server = null;
        }

        // clear cache
        this.clientHandler.clearCache();

        // clear client
        if (this.smartSocket) {
            this.smartSocket.close(true);
        }
        this.client = null;
        done();
    },

    update: function (done) {
        this.stop(function () {
            this.start(done);
        }.bind(this));
    },

    createServer: function () {
        var port = this.dictionary.getNumber('port', 9000);
        this.server = new WebSocketServer({port: port});
        this.log.info(this.toString(), '"'+this.getName()+'" listen on ' + port);

        this.server.on('connection', this.clientHandler.getHandler());
    },

    createClient: function () {
        if (!this.isMaster()) {
            if (this.client === null || this.client.readyState === WebSocket.OPEN) {
                var selfGroup = this.getModelEntity();
                // localize master node
                var master = this.dictionary.getString('master');
                if (selfGroup && master && master.length > 0) {
                    var masterDico = selfGroup.findFragmentDictionaryByID(master);
                    var port = this.dic_port.defaultValue;
                    if (masterDico) {
                        var val = masterDico.findValuesByID('port');
                        port = val.value;
                    }
                    var addresses = [];
                    var node = this.getKevoreeCore().getDeployModel().findNodesByID(master);
                    if (node) {
                        node.networkInformation.array.forEach(function (net) {
                            net.values.array.forEach(function (prop) {
                                if (net.name.toLowerCase().indexOf('ip') !== -1 || prop.name.toLowerCase().indexOf('ip') !== -1) {
                                    if (prop.value.indexOf(':') !== -1) {
                                        addresses.push('[' + prop.value + ']' + ':' + port);
                                    } else {
                                        addresses.push(prop.value + ':' + port);
                                    }
                                }
                            });
                        });

                        if (addresses.length === 0) {
                            throw new Error('WSGroup error: "'+this.getName()+'" unable to find a suitable address for master server "'+master+'"');
                        }

                        var factory = new kevoree.factory.DefaultKevoreeFactory();
                        var loader = factory.createJSONLoader();
                        var saver = factory.createJSONSerializer();

                        this.smartSocket = new SmartSocket({ addresses: addresses, loopBreak: 3000 });
                        this.smartSocket.start();

                        this.smartSocket.on('open', function (ws) {
                            this.log.info(this.toString(), '"' + this.getName() + '" connected to master server ' + ws.url);
                            this.client = ws;

                            var currentModel = saver.serialize(this.getKevoreeCore().getCurrentModel());
                            var registerMsg = new RegisterMessage(this.getNodeName(), currentModel);
                            ws.send(registerMsg.toRaw());
                        }.bind(this));

                        this.smartSocket.on('close', function (ws) {
                            this.log.info(this.toString(), 'Lost connection with master "'+master+'" at '+ws.url);
                        }.bind(this));

                        this.smartSocket.on('message', function (ws, msg) {
                            var parsedMsg = Protocol.parse(msg);
                            if (!parsedMsg) {
                                this.log.error(this.toString(), '"'+this.getName()+'" unknown Kevoree message ' + msg);
                            } else {
                                switch (parsedMsg.getType()) {
                                    case Protocol.PUSH_TYPE:
                                        // push from master
                                        var model = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                                        this.getKevoreeCore().deploy(model);
                                        break;

                                    default:
                                        this.log.error(this.toString(), '"'+this.getName()+'" unhandled Kevoree message ' + msg);
                                        break;
                                }
                            }
                        }.bind(this));
                    }
                }
            }
        }
    },

    pushToMaster: function (serializedModel) {
        if (this.client != null && this.client.readyState === WebSocket.OPEN) {
            var pushMessage = new PushMessage(serializedModel);
            this.client.send(pushMessage.toRaw());
            return true;
        } else {
            return false;
        }
    },

    hasMaster: function () {
        var master = this.dictionary.getString('master');
        return (master && master.length > 0);
    },

    isMaster: function () {
        if (this.hasMaster()) {
            return this.dictionary.getString('master') === this.getNodeName();
        } else {
            return false;
        }
    }
});

module.exports = WSGroup;