var WebSocket = require('ws');
var kevoree = require('kevoree-library').org.kevoree;

var serializer = new kevoree.serializer.JSONModelSerializer();

var PUSH = 'push';

module.exports = function (options, callback) {
  if (arguments.length == 0 || typeof options === 'function') throw new Error('You must give an options parameter to push.js');
  if (!options.model) throw new Error('You must give a model to options parameter');
  
  callback = callback || function () {};
  options.host = options.host || '127.0.0.1';
  options.port = options.port || '8000';
  
  var ws;
  try {
    var modelStr = serializer.serialize(options.model);
    ws = new WebSocket('ws://'+options.host+':'+options.port);
    ws.onopen = function () {
      // when the connection with the server is established push model to it
      ws.send(PUSH+'/'+modelStr);
      return callback();
    }
  } catch (err) {
    return callback(err);

  } finally {
    //if (ws) ws.close();
  }
}