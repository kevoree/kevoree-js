const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

const Proxy = AbstractComponent.extend({
  toString: 'Proxy',
  tdef_version: 1,

  in_in(msg) {
    this.out_out(msg);
  },

  out_out() {
    console.log('boom');
  }
});

module.exports = Proxy;
