var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WebSocket       = require('ws'),
    WebSocketServer = require('ws').Server,
    SmartSocket     = require('smart-socket');

var REGISTER = 'register',
    MESSAGE  = 'message';

/**
 * Kevoree channel
 * @type {WebSocketChannel}
 */
var WebSocketChannel = AbstractChannel.extend({
    toString: 'WebSocketChannel',

    dic_port: {
        fragmentDependant: true,
        optional: true,
        datatype: 'number',
        update: function () {
            this.stop();
            this.start();
        }
    },

    dic_path: {
        fragmentDependant: true,
        optional: true,
        update: function () {
            this.stop();
            this.start();
        }
    },

    construct: function () {
        this.server = null;
        this.client = null;
        this.connectedClients = {};
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function (_super) {
        _super.call(this);

        this.checkNoMultipleMasterServer();

        if (this.dic_port.value && this.dic_port.value.length > 0) {
            if (!isNaN(parseInt(this.dic_port.value))) {
                this.startWSServer(this.dic_port.value, processPath(this.dic_path.value));
            } else {
                throw new Error('WebSocketChannel error: '+this.getName()+'.port/'+this.getNodeName()+' attribute is not a number');
            }
        } else {
            this.startWSClient();
        }
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function (_super) {
        _super.call(this);

        if (this.server) {
            this.server.close();
            this.connectedClients = {};
        }

        if (this.smartSocket) {
            this.smartSocket.close();
            this.client = null;
        }
    },

    /**
     * When a channel is bound with an output port this method will be called when a message is sent
     *
     * @param fromPortPath port that sends the message
     * @param destPortPaths port paths of connected input port that should receive the message
     * @param msg
     */
    onSend: function (fromPortPath, destPortPaths, msg) {
        // rework msg object a bit
        var recipients = [];
        for (var i in destPortPaths) {
            // extract nodeName from destPortPath
            // TODO this is ugly :O API should only give nodeName not the whole destPortPath ?
            recipients.push(/nodes\[([\w_.-]+)\].+/g.exec(destPortPaths[i])[1]);
        }
        
        var jsonMsg = JSON.stringify({
            type: MESSAGE,
            message: msg,
            recipients: recipients
        });
        
        if (this.client) {
            // directly send message to server because we can't do much more =)
            if (this.client.readyState === 1) {
                this.client.send(jsonMsg);
            } else {
                // TODO client is not connected => put in a queue
            }

        } else if (this.server) {
            // broadcast message to each connected clients
            for (var nodeName in this.connectedClients) {
                if (this.connectedClients[nodeName].readyState === 1) {
                    this.connectedClients[nodeName].send(jsonMsg);
                } else {
                    // TODO client is not connected => put in a queue
                }
            }
        }

        // and to myself just in case
        this.localDispatch(msg);
    },

    startWSServer: function (port, path) {
        try {
            this.server = new WebSocketServer({port: port, path: path});
            this.log.debug(this.toString(), 'Master server created at '+this.server.options.host+":"+port+path);

            this.server.on('connection', function(ws) {
                ws.onmessage = localDispatchHandler.bind(this)(ws);
                ws.onerror = function () {
                    for (var nodeName in this.connectedClients) {
                        if (this.connectedClients[nodeName] === ws) {
                            delete this.connectedClients[nodeName];
                        }
                    }
                }.bind(this);
                ws.onclose = function () {
                    for (var nodeName in this.connectedClients) {
                        if (this.connectedClients[nodeName] === ws) {
                            delete this.connectedClients[nodeName];
                        }
                    }
                }.bind(this);

            }.bind(this));
        } catch (err) {
            // if we end-up here it most certainly means that we are running on the browser
            // platform, and yeah, we can't create a server on browser platform, so...
            this.log.warn(this.toString(), 'Are you trying to run a WebSocket server in kevoree-browser-runtime ? Sorry, I cannot do that :/');
        }
    },

    startWSClient: function () {
        var addresses = this.getMasterServerAddresses();
        if (addresses && addresses.length > 0) {
            this.smartSocket = new SmartSocket({
                addresses: addresses,
                timeout: 5000,
                handlers: {
                    onopen: function (ws) {
                        // save a ref of connected client
                        this.client = ws;
                        this.log.info(this.toString(), 'Now connected to master server '+ws.url);
                        // send registration message
                        this.client.send(JSON.stringify({
                            type: REGISTER,
                            message: this.getNodeName()
                        }));
                    }.bind(this),

                    onmessage: function (ws, event) {
                        localDispatchHandler.bind(this)(ws)(event);
                    }.bind(this),

                    onclose: function (ws) {
                        this.log.info(this.toString(), "Connection closed with server "+ws.url+". Retry attempt in 5 seconds");
                    }.bind(this)
                }
            });

            this.smartSocket.start();

        } else {
            throw new Error("No NetworkInformation specified for master server node. Can't connect to it :/");
        }
    },

    getMasterServerAddresses: function () {
        var addresses = [];

        var chan = this.getModelEntity();
        var fragDics = chan.fragmentDictionary.iterator();
        while (fragDics.hasNext()) {
            var dic = fragDics.next();
            var val = dic.findValuesByID('port');
            if (val && val.value && val.value.length > 0) {
                var port = val.value;
                var hosts = this.getNodeHosts(dic.name);
                for (var i in hosts) addresses.push(hosts[i]+':'+port);
                return addresses;
            }
        }
    },

    getNodeHostsByPort: function (portPath) {
        var model = this.getKevoreeCore().getCurrentModel();
        var node = model.findByPath(portPath).eContainer().eContainer();
        return this.getNodeHosts(node);
    },

    getNodeHosts: function (targetNode) {
        var model = this.getKevoreeCore().getDeployModel();
        var hosts = [];

        var node = model.findNodesByID(targetNode);
        var nets = node.networkInformation.iterator();
        while (nets.hasNext()) {
            var net = nets.next();
            var values = net.values.iterator();
            while (values.hasNext()) {
                var val = values.next();
                if (net.name.toLowerCase().indexOf('ip') != -1 ||
                    val.name.toLowerCase().indexOf('ip') != -1) {
                    hosts.push(val.value);
                }
            }
        }

        return hosts;
    },

    checkNoMultipleMasterServer: function () {
        var chan = this.getModelEntity();
        if (chan != null) {
            var portDefined = 0;
            var fragDics = chan.fragmentDictionary.iterator();
            while (fragDics.hasNext()) {
                var val = fragDics.next().findValuesByID('port');
                if (val && val.value && val.value.length > 0) portDefined++;
            }

            if (portDefined > 1) {
                throw new Error(this.toString()+" error: multiple master server defined. You are not supposed to specify more than ONE port attribute on this chan node fragments.");

            } else if (portDefined == 0) {
                throw new Error(this.toString()+" error: no master server defined. You should specify a node to be the master server (in order to do that, give to a node a value to its 'port' attribute)");

            } else {
                // all good
                return;
            }
        }

        throw new Error(this.toString()+" error: Unable to find chan instance in model (??)");
    }
});

function processPath(path) {
    if (path) {
        if (path.substr(0, 1) === '/') {
            return path;
        } else {
            return '/' + path;
        }
    }
    return '';
}

/**
 * you should call this method with a WebSocketChannel context (because it uses 'this', and expects it
 * to be a WebSocketChannel instance)
 * @param data
 */
var localDispatchHandler = function (ws) {
    return function (data) {
        if (data.type !== 'binary' || typeof(data.data) === 'string') data = data.data;
        else data = String.fromCharCode.apply(null, new Uint8Array(data.data));

        var msgObj = JSON.parse(data);

        if (this.client) {
            // i'm a client, dispatch locally
            this.localDispatch(msgObj.message);
        } else {
            // i'm a server, I need to process the message in order to find the recipient
            switch (msgObj.type) {
                case REGISTER:
                    this.log.info(this.toString(), "New registered client '"+msgObj.message+"' on '"+this.getName()+"' ("+ws._socket.remoteAddress+":"+ws._socket.remotePort+")");
                    this.connectedClients[msgObj.message] = ws;
                    break;

                default:
                case MESSAGE:
                    for (var i in msgObj.recipients) {
                        var nodeName = msgObj.recipients[i];
                        if (nodeName === this.getNodeName()) {
                            this.localDispatch(msgObj.message);
                            
                        } else if (this.connectedClients[nodeName]) {
                            // this node is already registered
                            if (this.connectedClients[nodeName].readyState === 1) {
                                // and still connected
                                this.connectedClients[nodeName].send(data);
                                
                            } else {
                                // TODO client not connected => put in queue
                            }
                        } else {
                            // recipient never registered on this server
                            // TODO => put in queue
                        }
                    }
                    break;
            }
        }
    }.bind(this);
}

module.exports = WebSocketChannel;
