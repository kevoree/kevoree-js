const AbstractChannel = require('kevoree-entities/lib/AbstractChannel');

const LocalChannel = AbstractChannel.extend({
  toString: 'LocalChannel',
  tdef_version: 1,

  dic_delay: { optional: false, defaultValue: 0 },

  onSend(fromPortPath, destPortPaths, msg, callback) {
    // directly dispatching message locally
    // without using client/server architecture because it is the purpose
    // of this channel : only works locally (on the same node)
    setTimeout(() => {
      if (this.started) { // check again because a "stop" could have been requested during "delay" awaiting
        this.localDispatch(msg, callback);
      }
    }, this.dictionary.getNumber('delay', 0)); // and applying some delay if requested
  }
});

module.exports = LocalChannel;
