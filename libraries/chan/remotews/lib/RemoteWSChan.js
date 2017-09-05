const AbstractChannel = require('kevoree-entities/lib/AbstractChannel');
const WebSocket = require('ws');
const RWebSocket = require('rwebsocket');

/**
 * Kevoree channel
 * @type {RemoteWSChan}
 */
const RemoteWSChan = AbstractChannel.extend({
  toString: 'RemoteWSChan',
  tdef_version: 1,

  dic_host: {
    optional: false
  },
  dic_port: {
    optional: true,
    defaultValue: 80
  },
  dic_path: {
    optional: true,
    defaultValue: '/'
  },
  dic_uuid: {
    optional: false
  },


  construct: function () {
    this.uri = null;
    this.receivers = {};
    this.dispatchers = {};
  },

  start: function (done) {
    const self = this;
    let error;
    try {
      self.uri = self.processURI();
    } catch (err) {
      error = err;
    }

    if (error) {
      done(error);
    } else {
      self.getLocalInputPorts().forEach((input) => {
        const topic = self.uri + input.path;
        const client = new RWebSocket(topic);
        self.receivers[input.path] = client;
        client.onopen = () => {
          self.log.debug(self.name + ' listening on topic "' + topic + '"');
        };
        client.onmessage = (event) => {
          self.localDispatch(event.data);
        };
        client.onerror = (evt) => {
          self.log.warn(evt);
        };
        client.onclose = (event) => {
          if (event.code === 1000) {
            self.log.debug(self.name + ' closed connection with topic "' + topic + '"');
          } else {
            self.log.warn(self.name + ' lost connection with topic "' + topic + '"');
          }
        };
        client.connect();
      });

      self.getRemoteInputPorts().forEach((remoteInput) => {
        const topic = self.uri + remoteInput.path;
        self.dispatchers[remoteInput.path] = new RWebSocket(topic);
        self.dispatchers[remoteInput.path].connect();
      });
      done();
    }
  },

  stop: function (done) {
    const self = this;
    this.uri = null;

    Object.keys(this.receivers)
      .forEach((path) => {
        try {
          self.receivers[path].close(1000);
        } catch (ignore) { /* noop */ }
        delete self.receivers[path];
      });

    Object.keys(this.dispatchers)
      .forEach((path) => {
        try {
          self.dispatchers[path].close(1000);
        } catch (ignore) { /* noop */ }
        delete self.dispatchers[path];
      });

    done();
  },

  update: function (done) {
    const self = this;
    self.stop((err) => {
      if (err) {
        done(err);
      } else {
        self.start(done);
      }
    });
  },

  /**
   * When a channel is bound with an output port this method will be called when a message is sent
   *
   * @param fromPortPath port that sends the message
   * @param destPortPaths port paths of connected input port that should receive the message
   * @param msg
   */
  onSend: function (fromPortPath, destPortPaths, msg) {
    const self = this;

    // send message to local inputs (if any)
    this.localDispatch(msg);

    // send message to remote inputs (if any)
    this.getRemoteInputPorts().forEach((remoteInput) => {
      const dispatcher = self.dispatchers[remoteInput.path];
      if (dispatcher) {
        if (dispatcher.client.readyState === WebSocket.OPEN) {
          dispatcher.send(msg + '');
        } else {
          self.log.warn('"' + self.name + '" unable to dispatch "' + msg + '" to topic"' + self.processURI() + remoteInput.path + '" (client not opened)');
        }
      } else {
        self.log.warn('"' + self.name + '" unable to dispatch "' + msg + '" to topic "' + self.processURI() + remoteInput.path + '" (client unavailable)');
      }
    });
  },

  processURI: function () {
    const host = this.dictionary.getString('host');
    const port = this.dictionary.getNumber('port', RemoteWSChan.prototype.dic_port.defaultValue);
    const uuid = this.dictionary.getString('uuid');
    let path = this.dictionary.getString('path', RemoteWSChan.prototype.dic_path.defaultValue);

    if (!host) {
      throw new Error('"host" attribute is not specified');
    }

    if (!uuid) {
      throw new Error('"uuid" attribute is not specified');
    }

    if (uuid.match(/\//g) !== null) {
      return new Error('"uuid" attribute must not contain slashes ("/")');
    }

    if (path.substr(0, 1) === '/') {
      // remove slash at the beginning
      path = path.substr(1, path.length);
    }

    if (path.length > 0 && path.substr(path.length - 1, 1) === '/') {
      // remove slash at the end
      path = path.substr(0, path.length - 2);
    }

    if (path.length > 0) {
      return 'ws://' + host + ':' + port + '/' + path + '/' + uuid;
    } else {
      return 'ws://' + host + ':' + port + '/' + uuid;
    }
  }
});

module.exports = RemoteWSChan;
