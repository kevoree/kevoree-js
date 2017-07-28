var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
  toString: 'ConsolePrinter',
  tdef_version: 1,

  in_input: function (msg) {
    var line = this.getName() + '>' + msg;
    console.log(line);
  }
});

module.exports = ConsolePrinter;
