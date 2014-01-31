var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WebSocket       = require('ws'),
    WebSocketServer = require('ws').Server;

var REGISTER = 'register',
    MESSAGE  = 'message';

/**
 * Kevoree channel
 * @type {WebSocketChannel}
 */
var WebSocketChannel = AbstractChannel.extend({
    toString: 'WebSocketChannel',

    construct: function () {
        this.server = null;
        this.client = null;
        this.connectedClients = {};
        this.timeoutID = null;
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function (_super) {
        _super.call(this);

        this.checkNoMultipleMasterServer();

        var port = this.dictionary.getValue('port');
        if (typeof(port) == 'undefined' || port.length == 0) this.startWSClient();
        else this.startWSServer(port);
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function () {
        this.log.warn(this.toString(), 'stop() method not implemented yet.');
        // TODO
        if (this.client != null) {
            clearTimeout(this.timeoutID);
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
        
        var msg = JSON.stringify({
            type: MESSAGE,
            message: msg,
            recipients: recipients
        });
        
        if (this.client) {
            // directly send message to server because we can't do much more =)
            if (this.client.readyState === 1) {
                this.client.send(msg);
            } else {
                // TODO client is not connected => put in a queue
            }

        } else if (this.server) {
            // broadcast message to each connected clients
            for (var nodeName in this.connectedClients) {
                if (this.connectedClients[nodeName].readyState === 1) {
                    this.connectedClients[nodeName].send(msg);
                } else {
                    // TODO client is not connected => put in a queue
                }
            }
        }

        // and to myself just in case
        this.localDispatch(msg);
    },

    startWSServer: function (port) {
        try {
            this.server = new WebSocketServer({port: port});
            this.log.debug(this.toString(), 'Master server created at '+this.server.options.host+":"+port);

            this.server.on('connection', function(ws) {
                ws.onmessage = localDispatchHandler.bind(this)(ws);
                ws.onerror = function () {
                    for (var nodeName in this.connectedClients) {
                        if (this.connectedClients[nodeName] === ws) delete this.connectedClients[nodeName];
                    }
                }.bind(this);
                ws.onclose = function () {
                    for (var nodeName in this.connectedClients) {
                        if (this.connectedClients[nodeName] === ws) delete this.connectedClients[nodeName];
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
            var connectToServer = function() {
                this.client = new WebSocket('ws://'+addresses[0]); // TODO change that => to try each different addresses not only the first one

                this.client.onopen = function() {
                    clearTimeout(this.timeoutID);
                    this.timeoutID = null;
                    this.log.info(this.toString(), 'Now connected to master server '+addresses[0]);
                    
                    // send registration message
                    this.client.send(JSON.stringify({
                        type: REGISTER,
                        message: this.getNodeName()
                    }));
                }.bind(this);

                this.client.onmessage = localDispatchHandler.bind(this)();

                this.client.onerror = function() {
                    // if there is an error, retry to initiate connection in 5 seconds
                    clearTimeout(this.timeoutID);
                    this.timeoutID = null;
                    this.timeoutID = setTimeout(connectToServer, 5000);
                }.bind(this);

                this.client.onclose = function() {
                    this.log.info(this.toString(), "Connection closed with server "+addresses[0]+". Retry attempt in 5 seconds");
                    // when websocket is closed, retry connection in 5 seconds
                    clearTimeout(this.timeoutID);
                    this.timeoutID = null;
                    this.timeoutID = setTimeout(connectToServer, 5000);
                }.bind(this);
            }.bind(this);
            connectToServer();

        } else {
            throw new Error("There is no master server in your model. You must specify a master server by giving a value to one port attribute.");
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

        var nets = model.nodeNetworks.iterator();
        while (nets.hasNext()) {
            var links = nets.next().link.iterator();
            while (links.hasNext()) {
                var props = links.next().networkProperties.iterator();
                while (props.hasNext()) {
                    hosts.push(props.next().value);
                }
            }
        }

        if (hosts.length === 0) {
            // no host found for this portPath in model, lets give it a try locally
            hosts.push('127.0.0.1');
        }

        return hosts;
    },

    checkNoMultipleMasterServer: function () {
        var chan = this.getModelEntity();
        if (chan != null) {
            var portDefined = 0;
            var kFragDics = (chan.fragmentDictionary) ? chan.fragmentDictionary.iterator() : null;
            if (kFragDics) {
                while (kFragDics.hasNext()) {
                    var val = kFragDics.next().findValuesByID('port');
                    if (val && val.value && val.value.length > 0) portDefined++;
                }
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
    },

    dic_port: {
        fragmentDependant: true,
        optional: true
    }
});

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
