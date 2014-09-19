// Created by leiko on 09/09/14 15:24
var http = require('http');

/**
 *
 * @param {Object}   options    - model   String representation of the model to push (JSON, xmi or trace)
 *                              - [type]  String for the Content-Type of your model (default: json)
 *                                        This "type" can be [json, xmi, trace]
 *                              - [host]  Hostname of the request (default: 'registry.kevoree.org')
 *                              - [port]  Port of the request (default: 80)
 * @param {Function} callback
 */
function pushModel(options, callback) {
    options.type = options.type || 'json';
    options.host = options.host || 'registry.kevoree.org';
    options.port = options.port || 80;


    var reqOpts = {
        hostname: options.host,
        port: options.port,
        path: '/deploy',
        method: 'POST',
        headers: {
            'Content-Type': (function () {
                switch (options.type) {
                    default:
                    case 'json':
                        return 'application/json';
                    case 'xmi':
                        return 'application/vnd.xmi+xml';
                    case 'trace':
                        return 'text/plain';
                }
            })(),
            'Content-Length': options.model.length
        }
    };

    var req = http.request(reqOpts, function (res) {
        switch (res.statusCode) {
            case 201:
                callback(null);
                break;

            case 406:
                callback(new Error('Unable to process model type "'+reqOpts.headers['Content-Type']+'" on registry'));
                break;

            default:
            case 500:
                callback(new Error('Server error'));
                break;
        }
    }).on('error', function (err) {
        callback(err);
    });

    req.write(options.model);
    req.end();
}

module.exports = pushModel;