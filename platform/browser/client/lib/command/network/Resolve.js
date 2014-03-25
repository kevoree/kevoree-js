var AbstractCommand = require('../AbstractCommand');

/**
 * Created by leiko on 12/03/14.
 */
var Resolve = AbstractCommand.extend({
    toString: 'Resolve',

    execute: function (deployUnit, forceInstall, callback) {
        $.ajax({
            type: 'POST',
            timeout: 15000,
            crossDomain: true,
            url: 'http://127.0.0.1:9040/resolve',
            data: {
                type: deployUnit.type,
                name: deployUnit.name,
                version: deployUnit.version,
                forceInstall: forceInstall
            },
            dataType: 'jsonp',
            success: function (res) {
                callback(null, res);
            },
            error: function (err) {
                if (err.statusText === 'timeout') {
                    callback(new Error('Unable to reach http://127.0.0.1:9040/resolve (connection timeout)'));
                } else {
                    callback(new Error(err.responseText + ' ('+err.status+' '+err.statusText+')'));
                }
            }
        });
    }
});

module.exports = Resolve;