'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');

const HaraKiri = AdaptationPrimitive.extend({
  toString: 'HaraKiri',

  execute: function(callback) {
    const kCore = this.node.getKevoreeCore();
    this.log.debug('Hara-kiri requested: shutting down this runtime...');
    kCore.once('deployed', () => {
      if (!kCore.stopping) {
        kCore.stop();
      }
    });
    callback();
  },

  undo: function(callback) {
    callback();
  }
});

module.exports = HaraKiri;
