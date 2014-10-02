var AbstractComponent = require('kevoree-entities').AbstractComponent;

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
