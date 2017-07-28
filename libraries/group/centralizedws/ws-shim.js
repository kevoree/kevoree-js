/* globals WebSocket */
// This file will be used instead of 'ws' for browsers.
// Because browsers already have a WebSocket implementation
// this file intent to only extend the prototype to add .on() & .off()
WebSocket.prototype.on = function (event, handler) {
  this['on' + event] = handler;
};
WebSocket.prototype.off = function (event, handler) {
  if (typeof handler === 'function') {
    if (this['on' + event] === handler) {
      delete this['on' + event];
    }
  }
};

function Server() {
  throw new Error('WebSocketServer are not supported in browser environment.');
}

module.exports = WebSocket;
module.exports.Server = Server;
