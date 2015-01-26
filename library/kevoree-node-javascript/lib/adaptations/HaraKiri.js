// Created by leiko on 26/01/15 17:30
var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;

var HaraKiri = AdaptationPrimitive.extend({
    toString: 'HaraKiri',

    execute: function (callback) {
        this.log.warn(this.toString(), 'Hara-kiri requested. This runtime is going to be shutdown.');
        var kCore = this.node.getKevoreeCore();
        kCore.once('deployed', function deployed() {
            kCore.off('deployed', deployed);
            kCore.stop();
        }.bind(this));
        callback();
    },

    undo: function (callback) {
        callback();
    }
});

module.exports = HaraKiri;