var KevoreeLogger   = require('kevoree-commons').KevoreeLogger,
    UIBrowserLogger = require('../ui/UIBrowserLogger');

/**
 * Created by leiko on 12/03/14.
 */
var BrowserLogger = KevoreeLogger.extend({
    toString: 'BrowserLogger',

    construct: function (tag) {
        this.ui = new UIBrowserLogger(this);
    },

    info: function (tag, msg) {
        if (!msg) {
            msg = tag;
            tag = this.tag;
        }
        tag = '['+tag+']';
        console.info(tag, msg);
        this.ui.info(tag, msg);
    },

    warn: function (tag, msg) {
        if (!msg) {
            msg = tag;
            tag = this.tag;
        }
        tag = '['+tag+']';
        console.warn(tag, msg);
        this.ui.warn(tag, msg);
    },

    error: function (tag, msg) {
        if (!msg) {
            msg = tag;
            tag = this.tag;
        }
        tag = '['+tag+']';
        console.error(tag, msg);
        this.ui.error(tag, msg);
    },

    debug: function (tag, msg) {
        if (!msg) {
            msg = tag;
            tag = this.tag;
        }
        tag = '['+tag+']';
        console.debug(tag, msg);
        this.ui.debug(tag, msg);
    },

    clear: function () {
        this.ui.clear();
    }
});

module.exports = BrowserLogger;