var AbstractGroup   = require('kevoree-entities').AbstractGroup,
    kevoree         = require('kevoree-library').org.kevoree,
    WebSocket       = require('ws'),
    async           = require('async'),
    WSServer        = require('ws').Server,
    SmartSocket     = require('smart-socket'),

// protocol constants
    PULL        = 'pull',
    PUSH        = 'push',
    DIFF        = 'diff',
    REGISTER    = 'register';

/**
 * WebSocketGroup: Kevoree group that handles model transfers through WebSocket protocol
 * This group allows only one node to be the "master server" for all other. In other words, when you
 * are making your model and it relies on this group, you should only set the dictionary "port" attribute
 * to one, and only one, node in the list of all the connected subnodes of this group.
 * By doing so, the node that has its "port" attribute set, became the "master server" and all other
 * nodes are going to try to initiate a persistent connection (through WebSocket) to this master server.
 * Push and pull request are all forwarded to master server node.
 *
 * @type {WebSocketGroup}
 */
var WebSocketGroup = AbstractGroup.extend({
    toString: 'WebSocketGroup',

    // START Dictionary attributes =====
    dic_port: {
        fragmentDependant: true,
        optional: true,
        datatype: 'number'
    },

    dic_path: {
        fragmentDependant: true,
        optional: true
    },

    dic_proxy_port: {
        fragmentDependant: true,
        optional: true,
        datatype: 'number'
    },
    // END Dictionary attributes =====

    construct: function () {
        this.server = null;
        this.smartSocket = null;
        this.connectedNodes = {};
    },

    start: function (_super) {
        _super.call(this);

        this.stopped = false;

        // assert('one and only one master server defined between all subnodes')
        this.checkNoMultipleMasterServer();

        if (this.dic_port.value && this.dic_port.value.length > 0) {
            if (!isNaN(parseInt(this.dic_port.value))) {
                if (this.dic_proxy_port.value && this.dic_proxy_port.value.length > 0) {
                    if (!isNaN(parseInt(this.dic_proxy_port.value))) {
                        this.server = this.startWSServer(this.dic_proxy_port.value, processPath(this.dic_path.value));
                    } else {
                        throw new Error('WebSocketGroup error: '+this.getName()+'.proxy_port/'+this.getNodeName()+' attribute is not a number');
                    }
                } else {
                    this.server = this.startWSServer(this.dic_port.value, processPath(this.dic_path.value));
                }
            } else {
                throw new Error('WebSocketGroup error: '+this.getName()+'.port/'+this.getNodeName()+' attribute is not a number');
            }
        } else {
            this.startWSClient();
        }
    },

    stop: function (_super) {
        _super.call(this);

        if (this.server) {
            try { this.server.close(); } catch (ignore) {}
            this.connectedNodes = {};
        }

        if (this.smartSocket) {
            // close client connection
            this.smartSocket.close(true);
        }
    },

    update: function () {
        this.log.debug(this.toString(), 'Woot update');
        this.stop();
        this.start();
    },

    checkNoMultipleMasterServer: function () {
        var group = this.getModelEntity();
        if (group != null) {
            var portDefined = 0;
            var kFragDics = (group.fragmentDictionary) ? group.fragmentDictionary.iterator() : null;
            if (kFragDics) {
                while (kFragDics.hasNext()) {
                    var val = kFragDics.next().findValuesByID('port');
                    if (val && val.value && val.value.length > 0) portDefined++;
                }
            }

            if (portDefined > 1) {
                throw new Error("WebSocketGroup error: multiple master server defined. You are not supposed to specify more than ONE port attribute on this group sub nodes.");

            } else if (portDefined == 0) {
                throw new Error("WebSocketGroup error: no master server defined. You should specify a node to be the master server (in order to do that, give to a node a value to its 'port' attribute)");

            } else {
                // all good
                return;
            }
        }

        throw new Error("WebSocketGroup error: Unable to find group instance in model (??)");
    },

    startWSServer: function (port, path) {
        // create a WebSocket server on specified port
        var self = this;
        var server = new WSServer({port: port, path: path});
        this.log.info(this.toString(), "WebSocket server started: "+ server.options.host+":"+port+path);

        server.on('connection', function(ws) {
            ws.onmessage = function (data) {
                if (data.type !== 'undefined') {
                    // data is a MessageEvent not a raw string
                    data = data.data;
                }
                self.processMessage(ws, data);
            }
        });

        return server;
    },

    startWSClient: function () {
        var addresses = this.getMasterServerAddresses();
        if (addresses.length > 0) {
            this.smartSocket = new SmartSocket({
                addresses: addresses,
                timeout: 5000,
                handlers: {
                    onopen: function (ws) {
                        ws.send(REGISTER+'/'+this.getNodeName());
                        this.log.info(this.toString(), 'Now connected & registered on master server '+ws.url);
                    }.bind(this),

                    onmessage: function (ws, event) {
                        var data = '';
                        if (typeof(event) === 'string') data = event;
                        else data = event.data;
                        var jsonLoader = new kevoree.loader.JSONModelLoader();
                        var model = jsonLoader.loadModelFromString(data).get(0);
                        this.kCore.deploy(model);
                    }.bind(this),

                    onclose: function (ws) {
                        this.log.debug(this.toString(), "Connection closed with server "+ws.url+". Retry attempt in 5 seconds");
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
        var port = null;
        var masterServerNodeName = null;

        var group = this.getModelEntity();
        var fragDics = group.fragmentDictionary.iterator();
        while (fragDics.hasNext()) {
            var fragDic = fragDics.next();
            var values = fragDic.values.iterator();
            while (values.hasNext()) {
                var val = values.next();
                if (val.name === 'port' && val.value.length > 0) {
                    // found port attribute
                    masterServerNodeName = fragDic.name;
                    port = val.value;
                    break;
                }
            }
        }

        if (port) {
            var nets = this.getNetworkInfos(masterServerNodeName);
            while (nets.hasNext()) {
                var net = nets.next();
                var props = net.values.iterator();
                while (props.hasNext()) {
                    var prop = props.next();
                    if (net.name.toLowerCase().indexOf('ip') != -1 ||
                        prop.name.toLowerCase().indexOf('ip') != -1) {
                        addresses.push(prop.value+':'+port);
                    }
                }
            }
        } else {
            throw new Error("WebSocketGroup error: no master server defined. You should specify a node to be the master server (in order to do that, give to a node a value to its 'port' attribute)");
        }

        return addresses;
    },

    getMasterServerNode: function () {
        var group = this.getModelEntity();
        var fragDics = group.fragmentDictionary.iterator();
        while (fragDics.hasNext()) {
            var fragDic = fragDics.next();
            var values = fragDic.values.iterator();
            while (values.hasNext()) {
                var val = values.next();
                if (val.name === 'port' && val.value.length > 0) {
                    // found a port attribute with a set value
                    return this.getKevoreeCore().getDeployModel().findNodesByID(fragDic.name);
                }
            }
        }
        return null;
    },

    processMessage: function (clientSocket, data) {
        if (data.startsWith(PUSH)) {
            this.onMasterServerPush(clientSocket, data.substr(PUSH.length+1));

        } else if (data.startsWith(PULL)) {
            this.onMasterServerPull(clientSocket);

        } else if (data.startsWith(DIFF)) {
            this.log.warn(this.toString(), 'Action "'+DIFF+'" is not implemented yet.');

        } else if (data.startsWith(REGISTER)) {
            this.onMasterServerRegister(clientSocket, data.substr(REGISTER.length+1));

        } else {
            this.log.error(this.toString(), 'Action "'+data.split('/')[0]+'" unknown.');
        }
    },

    onMasterServerPush: function (clientSocket, strData) {
        this.log.info(this.toString(), clientSocket._socket.remoteAddress+":"+clientSocket._socket.remotePort+" asked for a PUSH");

        var jsonLoader = new kevoree.loader.JSONModelLoader();

        try {
            var model = jsonLoader.loadModelFromString(strData).get(0);

            this.kCore.deploy(model);

            // broadcast model over all connected nodes
            for (var nodeName in this.connectedNodes) {
                if (this.connectedNodes[nodeName].readyState === 1) { // send current model to connected peers
                    this.connectedNodes[nodeName].send(strData);
                }
            }
        } catch (err) {
            throw new Error(this.toString() + ' error: "'+this.getName()+'" unable to deserialize pushed Kevoree model ('+err.message+')');
        }
    },

    onMasterServerPull: function (clientSocket) {
        this.log.info(this.toString(), clientSocket._socket.remoteAddress+":"+clientSocket._socket.remotePort+" asked for a PULL (json)");

        var serializer = new kevoree.serializer.JSONModelSerializer();
        var strModel = serializer.serialize(this.kCore.getCurrentModel());
        clientSocket.send(strModel);
    },

    onMasterServerRegister: function (clientSocket, nodeName) {
        this.connectedNodes[nodeName] = clientSocket;
        this.log.info(this.toString(), "New registered client '"+nodeName+"' ("+clientSocket._socket.remoteAddress+":"+clientSocket._socket.remotePort+")");

        clientSocket.on('close', function () {
            // on client disconnection : remove connected node entry from map
            delete this.connectedNodes.nodeName;
            this.log.info(this.toString(), "Registered client '"+nodeName+"' ("+clientSocket._socket.remoteAddress+":"+clientSocket._socket.remotePort+") left server.");
        }.bind(this));
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

module.exports = WebSocketGroup;