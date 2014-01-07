var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WebSocket       = require('ws'),
    WebSocketServer = require('ws').Server;

var REGISTER = 42;

/**
 * Kevoree channel
 * @type {WebSocketChannel}
 */
var WebSocketChannel = AbstractChannel.extend({
  toString: 'WebSocketChannel',

  construct: function () {
    this.server = null;
    this.client = null;
    this.connectedClients = [];
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
    if (this.client != null) {
      // directly send message to server because we can't much more =)
      this.client.send(msg);

    } else if (this.server != null) {
      // broadcast message to each connected clients
      for (var i in this.connectedClients) {
        this.connectedClients[i].send(msg);
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
        this.connectedClients.push(ws);

        ws.onmessage = localDispatchHandler.bind(this);
        ws.onerror = function () {
          this.connectedClients.splice(this.connectedClients.indexOf(ws), 1);
        }.bind(this);
        ws.onclose = function () {
          this.connectedClients.splice(this.connectedClients.indexOf(ws), 1);
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
      var connectToServer = function connectToServer() {
        this.client = new WebSocket('ws://'+addresses[0]); // TODO change that => to try each different addresses not only the first one

        this.client.onopen = function onOpen() {
          clearTimeout(this.timeoutID);
          this.timeoutID = null;
          this.log.info(this.toString(), 'Now connected to master server '+addresses[0]);
        }.bind(this);

        this.client.onmessage = localDispatchHandler.bind(this);

        this.client.onerror = function onError() {
          // if there is an error, retry to initiate connection in 5 seconds
          clearTimeout(this.timeoutID);
          this.timeoutID = null;
          this.timeoutID = setTimeout(connectToServer, 5000);
        }.bind(this);

        this.client.onclose = function onClose() {
          this.log.info(this.toString(), "client connection closed with server ("+this.client._socket.remoteAddress+":"+this.client._socket.remotePort+")");
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
var localDispatchHandler = function (data) {
  if (data.type !== 'binary' || typeof(data.data) === 'string') {
    // received data is a String
    this.localDispatch(data.data);

  } else {
    // received data is binary
    this.localDispatch(String.fromCharCode.apply(null, new Uint8Array(data.data)));
  }
}

module.exports = WebSocketChannel;
