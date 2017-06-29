var Kevoree = require('kevoree-api');

module.exports = Kevoree.Factory.Component({
  name: 'ConsolePrinter',
  version: 1,
  description: 'Prints out incoming messages to the console'
})
.Inject({
  context: Kevoree.Services.Context
})
.Input({
  input: { type: 'string' }
})
.Class({
  context: null,
  input: function (msg) {
    console.log(this.context.getInstanceName() + '> ' + msg);
  }
});
