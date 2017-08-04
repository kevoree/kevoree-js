const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
const ConsolePrinter = AbstractComponent.extend({
  toString: 'ConsolePrinter',
  tdef_version: 1,

  in_input(msg) {
    console.log(this.getName() + '>' + msg); // eslint-disable-line
  }
});

module.exports = ConsolePrinter;
