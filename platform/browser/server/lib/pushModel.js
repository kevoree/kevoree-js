var WebSocket = require('ws');

/**
 * Created by leiko on 20/06/14.
 */
module.exports = function (options, model, callback) {
    options.host = options.host || '127.0.0.1';
    options.port = options.port || 9000;
    options.path = options.path || '';

    if (options.path.substr(0, 1) === '/') {
        options.path = options.path.slice(1, options.path.length);
    }

    var ws = new WebSocket('ws://'+options.host+':'+options.port+'/'+options.path);
    ws.onopen = function () {
        ws.send('push/'+model);
        callback();
    };
    ws.onerror = function () {
        callback(new Error('Unable to connect to ws://'+options.host+':'+options.port+'/'+options.path));
    };
};