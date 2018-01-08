const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

const Webview = AbstractComponent.extend({
  toString: 'Webview',
  tdef_version: 1,

  dic_url: { defaultValue: 'http://www.kevoree.org' },

  start(done) {
    this.log.warn('This component is pretty useless server-side. Consider using it in a Kevoree Browser Runtime :)');
    done();
  }
});

module.exports = Webview;
