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
        appendLog(this.domLogger, tag, message, 'log-info');
    },

    debug: function (tag, message) {
        appendLog(this.domLogger, tag, message, 'log-debug');
    },

    warn: function (tag, message) {
        appendLog(this.domLogger, tag, message, 'log-warn');
    },

    error: function (tag, message) {
        appendLog(this.domLogger, tag, message, 'log-error');
    },

    clear: function () {
        this.domLogger.empty();
    }
});

function appendLog(uiLogger, tag, message, type) {
    $('.log-line').removeAttr('id');
    uiLogger.append(RuntimeTemplates['log-line'].render({
        tag: tag,
        message: message,
        type: type
    }));
    document.getElementById('last-log-line').scrollIntoView();
}

module.exports = UILogger;