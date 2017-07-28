'use strict';

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

function WebSocketServer() {
  throw new Error('WebSocketServer are not supported in browser environment.');
}

module.exports = WebSocket;
module.exports.WebSocketServer = WebSocketServer;
