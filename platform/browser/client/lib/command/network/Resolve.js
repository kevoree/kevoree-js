var AbstractCommand = require('../AbstractCommand');

/**
 * Created by leiko on 12/03/14.
 */
var Resolve = AbstractCommand.extend({
    toString: 'Resolve',

    execute: function (deployUnit, forceInstall, callback) {
        console.log("RESOLVE", deployUnit.name);
        $.ajax({
            type: 'POST',
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
                callback(new Error(err.responseText + ' ('+err.status+' '+err.statusText+')'));
            }
        });
    }
});

module.exports = Resolve;