var AbstractGroup   = require('kevoree-entities').AbstractGroup,
  kevoree         = require('kevoree-library').org.kevoree,
  WebSocket       = require('ws'),
  WSServer        = require('ws').Server,

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
    optional: true
  },
  // END Dictionary attributes =====

  construct: function () {
    this.server = null;
    this.client = null;
    this.connectedNodes = {};
    this.timeoutID = null;
  },

  start: function (_super) {
    _super.call(this);

    // assert('one and only one master server defined between all subnodes')
    this.checkNoMultipleMasterServer();

    if (this.dictionary.getValue('port') != undefined) {
      this.server = this.startWSServer(this.dictionary.getValue('port'));
    } else {
      console.log("AM A CLIENT");
      this.client = this.startWSClient();
    }
  },

  stop: function (_super) {
    _super.call(this);

    if (this.server != null) {
      this.server.close();
    }

    if (this.client != null) {
      // close client connection
      this.client.close();
      // remove reconnection task because we closed on purpose
      clearTimeout(this.timeoutID);
    }
  },

  push: function (model, targetNodeName) {
    if (targetNodeName == this.getMasterServerNodeName()) {
      this.onServerPush(model, this.getMasterServerAddresses());
    } else {
      this.onClientPush(model, targetNodeName);
    }
  },

  pull: function (targetNodeName, callback) {
    if (targetNodeName == this.getMasterServerNodeName()) {
      // pull request is for the master server, forward the request to it
      this.onServerPull(this.getMasterServerAddresses(), callback);
    } else {
      // pull request is for a client node, forward the request to it
      this.onClientPull(targetNodeName, callback);
    }
  },

  onServerPush: function (model, addresses) {
    var ws = new WebSocket('ws://'+addresses[0]); // TODO change that => to try each different addresses not only the first one
    ws.onopen = function onOpen() {
      var serializer = new kevoree.serializer.JSONModelSerializer();
      var modelStr = serializer.serialize(model);
      ws.send(PUSH+'/'+modelStr);
      ws.close();
    };
  },

  onClientPush: function (model, targetNodeName) {
    this.onServerPush(model, this.getMasterServerAddresses());
  },

  onServerPull: function (addresses, callback) {
    var ws = new WebSocket('ws://'+addresses[0]); // TODO change that => to try each different addresses not only the first one

    ws.onopen = function onOpen() {
      ws.send(PULL);
    };
    ws.onmessage = function onMessage(e) {
      var data = '';
      if (typeof(e) === 'string') data = e;
      else data = e.data;

      // close client
      ws.close();

      // load model and give it back to the callback
      var jsonLoader = new kevoree.loader.JSONModelLoader();
      var model = jsonLoader.loadModelFromString(data).get(0);
      callback(null, model);
    };
  },

  onClientPull: function (targetNodeName, callback) {
    this.onServerPull(this.getMasterServerAddresses(), callback);
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

  startWSServer: function (port) {
    // create a WebSocket server on specified port
    var self = this;
    var server = new WSServer({port: port});
    this.log.info(this.toString(), "WebSocket server started: "+ server.options.host+":"+port);

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
    if (addresses && addresses.length > 0) {
      console.log('GOT ADDRESSES', addresses);
      var group = this;
      var connectToServer = function () {
        var ws = new WebSocket('ws://'+addresses[0]); // TODO change that => to try each different addresses not only the first one

        ws.onopen = function onOpen() {
          clearTimeout(group.timeoutID);
          group.timeoutID = null;
          ws.send(REGISTER+'/'+group.getNodeName());
          group.log.info(group.toString(), 'Now connected & registered on master server '+addresses[0]);
        };
        ws.onmessage = function onMessage(e) {
          var data = '';
          if (typeof(e) === 'string') data = e;
          else data = e.data;
          var jsonLoader = new kevoree.loader.JSONModelLoader();
          var model = jsonLoader.loadModelFromString(data).get(0);
          group.kCore.deploy(model);
        };

        ws.onerror = function onError() {
          // if there is an error, retry to initiate connection in 5 seconds
          clearTimeout(group.timeoutID);
          group.timeoutID = null;
          group.timeoutID = setTimeout(connectToServer, 5000);
        }

        ws.onclose = function onClose() {
          group.log.info(this.toString(), "client connection closed with server ("+ws._socket.remoteAddress+":"+ws._socket.remotePort+")");
          // when websocket is closed, retry connection in 5 seconds
          clearTimeout(group.timeoutID);
          group.timeoutID = null;
          group.timeoutID = setTimeout(connectToServer, 5000);
        }
      }
      connectToServer();

    } else {
      throw new Error("There is no master server in your model. You must specify a master server by giving a value to one port attribute.");
    }
  },

  getMasterServerAddresses: function () {
    var ret = [],
      port = null;

    var kGroup = this.getModelEntity();
    if (kGroup) {
      var fragDics = kGroup.fragmentDictionary.iterator();
      while (fragDics.hasNext()) {
        var val = fragDics.next().findValuesByID('port');
        if (val) port = val.value;
        if (port && port.length > 0) {
          var nodeNetworks = this.getKevoreeCore().getDeployModel().nodeNetworks.iterator();
          while (nodeNetworks.hasNext()) {
            var links = nodeNetworks.next().link.iterator();
            while (links.hasNext()) {
              var netProps = links.next().networkProperties.iterator();
              while (netProps.hasNext()) {
                ret.push(netProps.next().value+':'+port);
              }
            }
          }
          break; // we don't need to process other attributes we were looking for a valid 'port' that's all
        }
      }
    } else {
      throw new Error("WebSocketGroup error: Unable to find group instance in model (??)");
    }

    // if no address found, give it a try locally
    if (ret.length == 0) ret.push('127.0.0.1:'+port);

    return ret;
  },

  getMasterServerNodeName: function () {
    var ret = null;
    var group = this.getModelEntity();
    if (group != null) {
      if (group.dictionary.values && group.dictionary.values.size() > 0) {
        var dicVals = group.dictionary.values.iterator();
        while (dicVals.hasNext()) {
          var val = dicVals.next();
          if (val.attribute.name == 'port') {
            if (typeof(val.value) !== 'undefined' && val.value != null && val.value.length > 0) {
              ret = val.targetNode.name;
              break; // we can stop the looping there, we found the master server node name
            }
          }
        }
      }
    }
    return ret;
  },

  processMessage: function (clientSocket, data) {
    if (data.startsWith(PUSH)) {
      this.onMasterServerPush(clientSocket, data.substr(PUSH.length+1));
      
    } else if (data.startsWith(PULL)) {
      this.onMasterServerPull(clientSocket, data.substr(PULL.length+1));
      
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
    var model = jsonLoader.loadModelFromString(strData).get(0);

    this.kCore.deploy(model);

    // broadcast model over all connected nodes
    for (var nodeName in this.connectedNodes) {
      this.connectedNodes[nodeName].send(strData);
    }
  },

  onMasterServerPull: function (clientSocket, strData) {
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

module.exports = WebSocketGroup;