var net = require('net');
var when = require('when');

var portRange = 45000;

function findPort(cb) {
    var port = portRange;
    portRange += 1;

    var server = net.createServer();
    server.listen(port, function () {
        server.once('close', function () {
            cb(port)
        });
        server.close()
    });
    server.on('error', function () {
        findPort(cb)
    });
}

/**
 *
 * @returns {Promise<T>}
 */
module.exports = function () {
    return when.promise(function (resolve) {
        findPort(function (port) {
            resolve(port);
        });
    });
};