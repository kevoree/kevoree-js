var Class = require('pseudoclass');

/**
 * Created by leiko on 12/03/14.
 */
var UIBrowserRuntime = Class({
    toString: 'UIBrowserRuntime',

    construct: function (runtime) {
        this.runtime = runtime;

        $('#platform-node-name').val('node'+parseInt(Math.random()*1000));

        $('#clear-logs').on('click', function () {
            runtime.clearLogs();
        });

        $('#start-runtime').on('click', function () {
            var nodeName = $('#platform-node-name').val();
            // TODO check "nodeName" validity
            runtime.start(nodeName);
        }.bind(this));

        $('#stop-runtime').on('click', function () {
            runtime.stop();
        }.bind(this));
    },

    started: function () {
        $('#start-runtime').prop('disabled', true);
        $('#stop-runtime').prop('disabled', false);

        $(window).on('beforeunload', function() {
            return 'Kevoree Browser Runtime will be stopped if you leave.';
        });
    },

    stopped: function () {
        $('#start-runtime').prop('disabled', false);
        $('#stop-runtime').prop('disabled', true);

        $(window).off('beforeunload');
    },

    wsConnected: function () {
        var status = $('#ws-status-text'),
            icon   = $('#ws-status-icon');
        status.html('Connected');
        status.css('color', '#0F0');
        icon.removeClass('glyphicon-exclamation-sign');
        icon.addClass('glyphicon-ok-sign');
    },

    wsDisconnected: function () {
        var status = $('#ws-status-text'),
            icon   = $('#ws-status-icon');
        status.html('Disconnected');
        status.css('color', '#F00');
        icon.addClass('glyphicon-exclamation-sign');
        icon.removeClass('glyphicon-ok-sign');
    }
});

module.exports = UIBrowserRuntime;