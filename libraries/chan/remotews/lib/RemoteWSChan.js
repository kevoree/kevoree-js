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
    let error;
    try {
      this.uri = this.processURI();
    } catch (err) {
      error = err;
    }

    if (error) {
      done(error);
    } else {
      this.getLocalInputPorts().forEach((input) => {
        const topic = this.uri + input.path;
        const client = new RWebSocket(topic);
        this.receivers[input.path] = client;
        client.onopen = () => {
          this.log.debug('listening on topic "' + topic + '"');
        };
        client.onmessage = (event) => {
          this.localDispatch(event.data);
        };
        client.onerror = (evt) => {
          this.log.warn(evt);
        };
        client.onclose = (event) => {
          if (event.code === 1000) {
            this.log.debug('closed connection with topic "' + topic + '"');
          } else {
            this.log.warn('lost connection with topic "' + topic + '"');
          }
        };
        client.connect();
      });

      this.getRemoteInputPorts().forEach((remoteInput) => {
        const topic = this.uri + remoteInput.path;
        this.dispatchers[remoteInput.path] = new RWebSocket(topic);
        this.dispatchers[remoteInput.path].connect();
      });
      done();
    }
  },

  stop: function (done) {
    this.uri = null;

    Object.keys(this.receivers)
      .forEach((path) => {
        try {
          this.receivers[path].close(1000);
        } catch (ignore) { /* noop */ }
        delete this.receivers[path];
      });

    Object.keys(this.dispatchers)
      .forEach((path) => {
        try {
          this.dispatchers[path].close(1000);
        } catch (ignore) { /* noop */ }
        delete this.dispatchers[path];
      });

    done();
  },

  update: function (done) {
    this.stop((err) => {
      if (err) {
        done(err);
      } else {
        this.start(done);
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
    // send message to local inputs (if any)
    this.localDispatch(msg);

    // send message to remote inputs (if any)
    this.getRemoteInputPorts().forEach((remoteInput) => {
      const dispatcher = this.dispatchers[remoteInput.path];
      if (dispatcher) {
        if (dispatcher.client.readyState === WebSocket.OPEN) {
          dispatcher.send(msg + '');
        } else {
          this.log.warn('unable to dispatch "' + msg + '" to topic"' + this.processURI() + remoteInput.path + '" (client not opened)');
        }
      } else {
        this.log.warn('unable to dispatch "' + msg + '" to topic "' + this.processURI() + remoteInput.path + '" (client unavailable)');
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
