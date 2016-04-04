var Kevoree = require('kevoree-api');

var metas = {
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
};

function ConsolePrinter() {}
ConsolePrinter.prototype = {
  context: null,
  input: function (message) {
    console.log(this.context.getInstanceName()+'> '+message);
  }
};

Kevoree.componentDecorator(ConsolePrinter, metas);
Kevoree.injectDecorator(ConsolePrinter, 'context', Kevoree.Services.Context);
Kevoree.inputDecorator(ConsolePrinter, 'input', { type: 'string' });

module.exports = ConsolePrinter;
