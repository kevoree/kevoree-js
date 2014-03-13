var Class = require('pseudoclass');

/**
 * Created by leiko on 12/03/14.
 */
var AbstractCommand = Class({
    toString: 'AbstractCommand',

    construct: function (runtime) {
        this.runtime = runtime;
    },

    execute: function () {
        console.debug('Command '+this.toString()+'.execute(): not implemented yet.');
    }
});

module.exports = AbstractCommand;