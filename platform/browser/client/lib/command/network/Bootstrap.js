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
            url: 'http://127.0.0.1:9040/bootstrap',
            data: { nodename: nodeName },
            dataType: 'jsonp',
            success: function (res) {
                var loader = new kevoree.loader.JSONModelLoader();
                var model = loader.loadModelFromString(res.model).get(0);
                callback(null, model);
            },
            error: function (err) {
                callback(new Error(err.responseText + ' ('+err.status+' '+err.statusText+')'));
            }
        });
    }
});

module.exports = Bootstrap;