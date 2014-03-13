var Class = require('pseudoclass');

/**
 * Created by leiko on 12/03/14.
 */
var UILogger = Class({
    toString: 'UILogger',

    construct: function (logger) {
        this.logger = logger;
        this.domLogger = $('#logger');
    },

    info: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-info'
        }));
        document.getElementById('last-log-line').scrollIntoView();
    },

    debug: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-debug'
        }));
        document.getElementById('last-log-line').scrollIntoView();
    },

    warn: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-warn'
        }));
        document.getElementById('last-log-line').scrollIntoView();
    },

    error: function (tag, message) {
        $('.log-line').removeAttr('id');
        this.domLogger.append(RuntimeTemplates['log-line'].render({
            tag: tag,
            message: message,
            type: 'log-error'
        }));
        document.getElementById('last-log-line').scrollIntoView();
    },

    clear: function () {
        this.domLogger.empty();
    }
});

module.exports = UILogger;