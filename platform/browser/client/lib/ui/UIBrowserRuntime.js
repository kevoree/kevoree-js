var Class = require('pseudoclass'),
    _     = require('underscore.string');

/**
 * Created by leiko on 12/03/14.
 */
var UIBrowserRuntime = Class({
    toString: 'UIBrowserRuntime',

    construct: function (runtime) {
        this.runtime = runtime;

        var uiNodeName = $('#platform-node-name');
        uiNodeName.val('node'+ _.capitalize(Math.random().toString(36).substr(2, 4)));

        $('#clear-logs').on('click', function () {
            runtime.clearLogs();
        });

        function startListener () {
            runtime.start(uiNodeName.val());
        }

        $('#start-runtime').on('click', startListener);
        uiNodeName.on('keyup', function (e) {
            if(e.keyCode == 13) {
                startListener();
            }
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