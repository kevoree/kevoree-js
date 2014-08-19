var Class  = require('pseudoclass'),
    chalk  = require('chalk');

var LEVELS = ['all', 'debug', 'info', 'warn', 'error', 'quiet'];

var chalkInfo       = chalk.grey,
    chalkWarn       = chalk.grey.bgYellow,
    chalkWarnMsg    = chalk.yellow,
    chalkError      = chalk.white.bgRed,
    chalkErrorMsg   = chalk.red,
    chalkDebug      = chalk.cyan;

var KevoreeLogger = Class({
    toString: 'KevoreeLogger',

    construct: function (tag) {
        this.tag = tag;
        this.level = 2;
        this.filter = '';
    },

    info: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('info')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.log(getTime()+'  '+chalkInfo('INFO')+'   '+processTag(tag)+'  '+chalkInfo(msg));
            }
        }
    },

    debug: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('debug')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.log(getTime()+'  '+chalkDebug('DEBUG ')+' '+processTag(tag)+'  '+chalkDebug(msg));
            }
        }
    },

    warn: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('warn')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.warn(getTime()+'  '+chalkWarn('WARN')+'   '+processTag(tag)+'  '+chalkWarnMsg(msg));
            }
        }
    },

    error: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('error')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.error(getTime() + '  ' + chalkError('ERROR') + '  ' + processTag(tag) + '  ' + chalkErrorMsg(msg));
            }
        }
    },

    setLevel: function (level) {
        this.level = level;
        console.log(getTime()+'  '+chalkInfo('ALL ')+'   '+processTag(this.toString())+'  '+chalkInfo('Set logLevel= '+LEVELS[this.level]));
    },

    setFilter: function (filter) {
        this.filter = filter;
        console.log(getTime()+'  '+chalkInfo('ALL ')+'   '+processTag(this.toString())+'  '+chalkInfo('Set logFilter= "'+this.filter+'"'));
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
};

var getTime = function getTime() {
    var time = new Date();
    var hours = (time.getHours().toString().length == 1) ? '0'+time.getHours() : time.getHours();
    var mins = (time.getMinutes().toString().length == 1) ? '0'+time.getMinutes() : time.getMinutes();
    var secs = (time.getSeconds().toString().length == 1) ? '0'+time.getSeconds() : time.getSeconds();
    return chalk.grey(hours+':'+mins+':'+secs);
};


KevoreeLogger.ALL   = LEVELS.indexOf('all');
KevoreeLogger.INFO  = LEVELS.indexOf('info');
KevoreeLogger.DEBUG = LEVELS.indexOf('debug');
KevoreeLogger.WARN  = LEVELS.indexOf('warn');
KevoreeLogger.ERROR = LEVELS.indexOf('error');
KevoreeLogger.QUIET = LEVELS.indexOf('quiet');

module.exports = KevoreeLogger;