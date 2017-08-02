const util = require('util');
const events = require('events');
const WebSocket = require('ws');
const shortid = require('../util/shortid');

const HEARTBEAT_TIMEOUT = 15000;
const PONG_TIMEOUT = 5000;

function HeartBeatManager(client, hbTimeout) {
  const self = this;
  self.hbTimeout = hbTimeout || HEARTBEAT_TIMEOUT;
  self.client = client;

  // compare pong messages to last stored pingMsg
  client.on('pong', function (pong) {
    const pongMsg = pong + '';
    if (pongMsg === self.pingMsg) {
      // pong answer === ping message
      // => all good
      self.stop();
      self.emit('pong', pongMsg);
      self.start();
    } else {
      // pong answer !== ping message
      // => wrong state
      self.stop();
      self.emit('pong-differs', pongMsg, self.pingMsg);
      client.close(4043, 'pong answer differs from ping');
    }
  });

  client.on('close', function () {
    self.emit('stop');
    self.stop();
  });
}

util.inherits(HeartBeatManager, events.EventEmitter);

HeartBeatManager.prototype.start = function () {
  const self = this;
  self.heartBeatTimeout = setTimeout(function () {
    self.sendHeartBeat();
  }, self.hbTimeout);
};

HeartBeatManager.prototype.sendHeartBeat = function () {
  const self = this;
  if (this.client.readyState === WebSocket.OPEN) {
    // create a random message
    this.pingMsg = shortid();
    // send it as a ping
    this.client.ping(this.pingMsg, null, false);
    this.emit('ping', this.pingMsg);

    // wait PONG_TIMEOUT ms before considering client as unresponsive
    this.pingTimeout = setTimeout(function () {
      // unable to receive answer to ping => unresponsive
      self.stop();
      self.emit('pong-timeout', self.pingMsg);
      self.client.close(4042, 'no pong answer');
    }, PONG_TIMEOUT);
  } else {
    // client is not connected
    self.stop();
    self.emit('not-connected');
  }
};

HeartBeatManager.prototype.stop = function () {
  clearTimeout(this.heartBeatTimeout);
  clearTimeout(this.pingTimeout);
};

module.exports = HeartBeatManager;
