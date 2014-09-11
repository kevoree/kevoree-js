// Created by leiko on 09/09/14 15:23
var http = require('http');

/**
 *
 * @param {Object}   options    - fqn:       Fully Qualified Name of a TypeDefinition
 *                                           (e.g 'org.kevoree.library.js.JavascriptNode')
 *                              - [version]: TypeDefinition version (if version is not given, then '*' will be used)
 *                              - [type]:    Retrieved model type (default to 'json', but you can ask for 'xmi'
 *                                           or 'trace')
 *                              - [parse]:   If set to true, it will parse the last part of the fqn to get the
 *                                           TypeDefinition name from it (default: true)
 * @param {Function} callback
 */
function fromFQN(options, callback) {
    options.version = options.version || '*';
    options.type    = options.type    || 'json';
    options.parse   = (function () {
        if (typeof(options.parse) === 'boolean') {
            return options.parse;
        } else {
            return true;
        }
    })();

    var fqn;
    if (options.parse) {
        fqn = options.fqn.split('.');
        var tdef = fqn.pop();
        fqn = fqn.join('/');
        fqn += '/name=' + tdef + ',version=' + options.version;
    } else {
        fqn = options.fqn.replace(/\./g, '/');
    }

    var reqOpts = {
        hostname: 'registry.kevoree.org',
        path: '/v5/' + fqn,
        port: 80,
        headers: {
            Accept: (function () {
                switch (options.type) {
                    default:
                    case 'json':
                        return 'application/json';

                    case 'xmi':
                        return 'application/vnd.xmi+xml';

                    case 'trace':
                        return 'text/plain';
                }
            })()
        },
        withCredentials: false
    };

    var req = http.request(reqOpts, function (res) {
        switch (res.statusCode) {
            case 200:
                var data = '';
                res.on('data', function (chunk) { data += chunk; });
                res.on('end', function () {
                    switch (res.headers['content-type']) {
                        case 'application/json':
                            callback(null, JSON.stringify(JSON.parse(data, null, 4)));
                            break;

                        case 'application/vnd.xmi+xml':
                        case 'text/plain':
                            callback(null, data);
                            break;

                        default:
                            callback(new Error('Response content MIME Type should be "'+reqOpts.headers.Accept+'" ' +
                                '(and not "'+res.headers['content-type']+'")'));
                            break;
                    }
                });
                break;

            case 404:
                callback(new Error('Unable to find "'+options.fqn+'" on Kevoree registry'));
                break;

            default:
            case 500:
                callback(new Error('Server error'));
                break;
        }
    }).on('error', function (err) {
        callback(err);
    });

    req.end();
}

module.exports = fromFQN;