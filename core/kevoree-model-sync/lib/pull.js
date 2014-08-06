var WebSocket = require('ws');
var kevoree = require('kevoree-library').org.kevoree;

var factory = new kevoree.factory.DefaultKevoreeFactory();
var loader = factory.createJSONLoader();

module.exports = function (options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    options.host = options.host || '127.0.0.1';
    options.port = options.port || '8000';
    options.path = options.path || '/';

    if (options.path.substr(0, 1) !== '/') options.path = '/' + options.path;
    var ws = new WebSocket('ws://'+options.host+':'+options.port+options.path);
    ws.onopen = function () {
        // when the connection with the server is established ask for the current model
        ws.send('pull');
    };

    ws.onmessage = function (e) {
        var data = '';
        if (typeof(e) === 'string') data = e;
        else data = e.data;

        try {
            var model = loader.loadModelFromString(data).get(0);
            return callback(null, model);

        } catch (err) {
            return callback(err);

        } finally {
            ws.close();
        }
    };
};