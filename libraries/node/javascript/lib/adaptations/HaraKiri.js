'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');

const HaraKiri = AdaptationPrimitive.extend({
  toString: 'HaraKiri',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    const kCore = this.node.getKevoreeCore();
    this.log.debug('Hara-kiri requested: shutting down this runtime...');
    kCore.once('deployed', () => {
      if (!kCore.stopping) {
        kCore.stop();
      }
    });
    return Promise.resolve();
  },

  undo: function() {
    return Promise.resolve();
  }
});

module.exports = HaraKiri;
