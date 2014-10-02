var AbstractComponent = require('kevoree-entities').AbstractComponent;
var view = require('../generated-ui/view');

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
    toString: 'ConsolePrinter',

    in_input: function (msg) {
        console.log(this.getName() + '>' + msg);
    }
});

module.exports = ConsolePrinter;
