var AbstractCommand = require('../AbstractCommand'),
    kevoree         = require('kevoree-library').org.kevoree;

/**
 * Created by leiko on 12/03/14.
 */
var Bootstrap = AbstractCommand.extend({
    toString: 'Bootstrap',

    execute: function (nodeName, callback) {
        $.ajax({
            type: 'POST',
            url: 'bootstrap',
            timeout: 1500,
            data: {
                uuid: this.runtime.getUUID(),
                nodename: nodeName
            },
            success: function (res) {
                if (res.model) {
                    var loader = new kevoree.loader.JSONModelLoader();
                    var model = loader.loadModelFromString(res.model).get(0);
                    callback(null, model);
                } else {
                    callback(new Error(res.error));
                }
            },
            error: function (err) {
                if (err.statusText === 'timeout') {
                    callback(new Error('Unable to reach '+window.location.href+'bootstrap (connection timeout)'));
                } else {
                    callback(new Error(err.responseText + ' ('+err.status+' '+err.statusText+')'));
                }
            }
        });
    }
});

module.exports = Bootstrap;