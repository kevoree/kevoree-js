const util = require('util');
const events = require('events');
const WebSocket = require('ws');
const shortid = require('../util/shortid');

const HEARTBEAT_TIMEOUT = 15000;
const PONG_TIMEOUT = 5000;

function HeartBeatManager(client, hbTimeout) {
  this.hbTimeout = hbTimeout || HEARTBEAT_TIMEOUT;
  this.client = client;

  // compare pong messages to last stored pingMsg
  client.on('pong', (pong) => {
    const pongMsg = pong + '';
    if (pongMsg === this.pingMsg) {
      // pong answer === ping message
      // => all good
      this.stop();
      this.emit('pong', pongMsg);
      this.start();
    } else {
      // pong answer !== ping message
      // => wrong state
      this.stop();
      this.emit('pong-differs', pongMsg, this.pingMsg);
      client.close(4043, 'pong answer differs from ping');
    }
  });

  client.on('close', () => {
    this.emit('stop');
    this.stop();
  });
}

HeartBeatManager.prototype = {
  start() {
    this.heartBeatTimeout = setTimeout(() => {
      this.sendHeartBeat();
    }, this.hbTimeout);
  },

  stop() {
    clearTimeout(this.heartBeatTimeout);
    clearTimeout(this.pingTimeout);
  },

  sendHeartBeat() {
    if (this.client.readyState === WebSocket.OPEN) {
      // create a random message
      this.pingMsg = shortid();
      // send it as a ping
      this.client.ping(this.pingMsg, null, false);
      this.emit('ping', this.pingMsg);

      // wait PONG_TIMEOUT ms before considering client as unresponsive
      this.pingTimeout = setTimeout(() => {
        // unable to receive answer to ping => unresponsive
        this.stop();
        this.emit('pong-timeout', this.pingMsg);
        this.client.close(4042, 'no pong answer');
      }, PONG_TIMEOUT);
    } else {
      // client is not connected
      this.stop();
      this.emit('not-connected');
    }
  }
};

util.inherits(HeartBeatManager, events.EventEmitter);

module.exports = HeartBeatManager;
