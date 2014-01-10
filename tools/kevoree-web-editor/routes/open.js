/*
 * POST open from node
 */
var net = require('net');
var java = require('java');
var config = require('../config');
java.classpath.push(config.KEV_JAR);

module.exports = function (req, res) {
  if (req.query.uri) {
    var port = null,
      host = null;

    var splittedUri = req.query.uri.split(':');
    if (splittedUri.length == 2) {
      host = splittedUri[0];
      port = splittedUri[1];

      var clientConn = null;
      var connListener = java.newProxy('jexxus.common.ConnectionListener', {
        connectionBroken: function (/* Connection */ broken, /* Boolean */ forced) {
          sendError(res, 'Connection closed');
        },
        receive: function (/* Array[Byte] */ data, /* Connection */ from) {
          // receiving data from server (json model)
          res.jsonp({
            result: 1,
            message: 'Ok',
            model: String.fromCharCode.apply(null, data)
          });

          // close socket
          clientConn.closeSync();
        },
        clientConnected: function (/* ServerConnection */ conn) {}
      });

      clientConn = java.newInstanceSync('jexxus.client.ClientConnection', connListener, host, parseInt(port), false);

      // connect with 5 secs timeout
      clientConn.connect(5000, function (connErr) {
        if (connErr) {
          sendError(res, 'ClientConnection.connect(5000): something went wrong');
        }

        // connection : ok => send 0
        // TODO use clean protocol instead of this ugly 42 byte
        var byteArray = java.newArray("byte", [java.newByte(42)]);
        clientConn.send(byteArray, java.getStaticFieldValue('jexxus.common.Delivery', 'RELIABLE'), function (sendErr) {
          if (sendErr) {
            sendError(res, 'ClientConnection.send(0): '+sendErr.message);
          }
        })
      });

    } else {
      sendError(res, 'Malformed URI. (valid: localhost:8042, current: '+req.query.uri+')');
    }

  } else {
    sendError(res, '/open ajax request needs an uri param');
  }
}

function sendError(res, mess) {
  return res.jsonp({
    result: -1,
    message: mess
  });
}