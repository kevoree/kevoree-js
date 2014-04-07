var Class  = require('pseudoclass'),
    chalk  = require('chalk');

var chalkInfo  = chalk.grey,
    chalkWarn  = chalk.grey.bgYellow,
    chalkError = chalk.white.bgRed,
    chalkDebug = chalk.cyan;

var KevoreeLogger = Class({
    toString: 'KevoreeLogger',

    construct: function (tag) {
        this.tag = tag;
    },

    info: function (tag, msg) {
        if (typeof(msg) === 'undefined') {
            msg = tag;
            tag = this.tag;
        }
        console.log(getTime()+'  '+chalkInfo('INFO')+'   '+processTag(tag)+'  '+chalk.grey(msg));
    },

    warn: function (tag, msg) {
        if (typeof(msg) === 'undefined') {
            msg = tag;
            tag = this.tag;
        }
        console.warn(getTime()+'  '+chalkWarn('WARN')+'   '+processTag(tag)+'  '+chalk.yellow(msg));
    },

    error: function (tag, msg) {
        if (typeof(msg) === 'undefined') {
            msg = tag;
            tag = this.tag;
        }
        console.error(getTime()+'  '+chalkError('ERROR')+'  '+processTag(tag)+'  '+chalk.red(msg));
    },

    debug: function (tag, msg) {
        if (typeof(msg) === 'undefined') {
            msg = tag;
            tag = this.tag;
        }
        console.log(getTime()+'  '+chalkDebug('DEBUG ')+' '+processTag(tag)+'  '+chalk.cyan(msg));
    }
});

var processTag = function processTag(tag) {
    if (tag.length >= 15) {
        tag = tag.substr(0, 14)+'.';
    } else {
        var spaces = '';
        for (var i=0; i < 15 - tag.length; i++) spaces += ' ';
        tag += spaces;
    }

    return chalk.magenta(tag);
}

var getTime = function getTime() {
    var time = new Date();
    var hours = (time.getHours().toString().length == 1) ? '0'+time.getHours() : time.getHours();
    var mins = (time.getMinutes().toString().length == 1) ? '0'+time.getMinutes() : time.getMinutes();
    var secs = (time.getSeconds().toString().length == 1) ? '0'+time.getSeconds() : time.getSeconds();
    return chalk.grey(hours+':'+mins+':'+secs);
};

module.exports = KevoreeLogger;