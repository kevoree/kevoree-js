// Created by leiko on 09/09/14 15:23
var http = require('http');

/**
 *
 * @param {Object}   options    - fqns:      Fully Qualified Names of Packages/DeployUnits/TypeDefinitions
 *                                           (e.g 'org.kevoree.library.js.JavascriptNode')
 *                              - [version]: TypeDefinition version (if version is not given, then '*' will be used)
 *                              - [type]:    Retrieved model type (default to 'json', but you can ask for 'xmi'
 *                                           or 'trace')
 *                              - [parse]:   If set to true, it will parse the last part of the fqn to get the
 *                                           TypeDefinition name from it (default: true)
 *                              - [kevPath]: Boolean to tell whether or not the fqns should be parsed or if they are
 *                                           already Kevoree model paths (default: false).
 *                                           e.g  options.kevPath = true
 *                                                => fqns array is supposed to contain real Kevoree model paths
 * @param {Function} callback
 */
function fromFQN(options, callback) {
    options.type    = options.type    || 'json';

    var reqOpts = {
        hostname: 'localhost',
        port: 8080,
        headers: {},
        withCredentials: false
    };

    var fqn, fqns = [];
    if (options.kevPath) {
        fqns = JSON.stringify(options.fqns);
        reqOpts.method = 'POST';
        reqOpts.path = '/';
        reqOpts.headers['Content-Type'] = 'text/plain';
        reqOpts.headers['Content-Length'] = fqns.length;
    } else {
        if (options.fqns.length === 1) {
            // using GET method
            fqn = getUrlPath(options.fqns[0]);

            reqOpts.method = 'GET';
            reqOpts.path = '/' + fqn;
            reqOpts.Accept = (function () {
                switch (options.type) {
                    default:
                    case 'json':
                        return 'application/json';

                    case 'xmi':
                        return 'application/vnd.xmi+xml';

                    case 'trace':
                        return 'text/plain';
                }
            })();
        } else {
            // multiple FQN => need to use POST method
            fqns = JSON.stringify(options.fqns.map(function (fqn) {
                return getModelPath(fqn);
            }));

            reqOpts.method = 'POST';
            reqOpts.path = '/';
            reqOpts.headers['Content-Type'] = 'text/plain';
            reqOpts.headers['Content-Length'] = fqns.length;
        }
    }

    var req = http.request(reqOpts, function (res) {
        switch (res.statusCode) {
            case 200:
                var data = '';
                res.on('data', function (chunk) { data += chunk; });
                res.on('end', function () {
                    switch (res.headers['content-type']) {
                        case 'application/json':
                            callback(null, JSON.stringify(JSON.parse(data), null, 4));
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
                callback(new Error('Unable to find "'+options.fqns+'" on Kevoree registry'));
                break;

            default:
            case 500:
                callback(new Error('Server error'));
                break;
        }
    }).on('error', function (err) {
        callback(err);
    });

    if (fqns.length > 1) {
        req.write(fqns);
    }

    req.end();
}

function getModelPath(fqn) {
    // check for version
    fqn = fqn.split('/');
    var vers;
    if (fqn.length === 2) {
        vers = fqn.pop();
    }

    fqn = fqn[0].split('.');
    var last = fqn.pop();
    fqn = 'packages[' + fqn.join(']/packages[') + ']/name=' + last;

    if (vers) {
        fqn += ',version=' + vers;
    }

    return fqn;
}

function getUrlPath(fqn) {
    // check for version
    fqn = fqn.split('/');
    var vers;
    if (fqn.length === 2) {
        vers = fqn.pop();
    }

    fqn = fqn[0].split('.');
    var last = fqn.pop();
    fqn = fqn.join('/');
    fqn += '/name=' + last;

    if (vers) {
        fqn += ',version=' + vers;
    }

    return fqn;
}

module.exports = fromFQN;