var Class = require('pseudoclass');

/**
 * Created by leiko on 12/03/14.
 */
var UILogger = Class({
    toString: 'UILogger',

    construct: function (logger) {
        this.logger = logger;
        this.domLogger = $('#logger');

        this.logLevels = {
            info:    $('#log-level-info').prop('checked'),
            debug:   $('#log-level-debug').prop('checked'),
            warning: $('#log-level-warning').prop('checked'),
            error:   $('#log-level-error').prop('checked')
        };

        $('input[name="logLevels"]').on('click', function (e) {
            // retrieve state from DOM
            var checkbox = $(e.currentTarget);
            var level = checkbox.val();
            var checked = checkbox.prop('checked');

            // update model
            this.logLevels[level] = checked;

            // update UI
            this.updateLogs();
        }.bind(this));
    },

    info: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-info'
        }));
        document.getElementById('last-log-line').scrollIntoView();

        this.updateLogs();
    },

    debug: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-debug'
        }));
        document.getElementById('last-log-line').scrollIntoView();

        this.updateLogs();
    },

    warn: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-warn'
        }));
        document.getElementById('last-log-line').scrollIntoView();

        this.updateLogs();
    },

    error: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-error'
        }));
        document.getElementById('last-log-line').scrollIntoView();

        this.updateLogs();
    },

    clear: function () {
        this.domLogger.empty();
    },

    updateLogs: function () {
        var lines = {
            info:    $('.log-info'),
            debug:   $('.log-debug'),
            error:   $('.log-error'),
            warning: $('.log-warn')
        };

        for (var level in lines) {
            if (this.logLevels[level]) {
                lines[level].show();
            } else {
                lines[level].hide();
            }
        }
    }
});

module.exports = UILogger;