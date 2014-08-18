var AbstractChannel = require('kevoree-entities').AbstractChannel;

var LocalChannel = AbstractChannel.extend({
    toString: 'LocalChannel',

    dic_delay: { optional: false, defaultValue: 0, fragmentDependant: false },

    onSend: function (fromPortPath, destPortPaths, msg) {
        this._super();
        if (this.started) {
            // directly dispatching message locally
            // without using client/server architecture because it is the purpose
            // of this channel : only works locally (on the same node)
            var delay = this.dictionary.getValue('delay') || 0;
            setTimeout(function () {
                this.localDispatch(msg);
            }.bind(this), delay); // and applying some delay if requested
        }
    }
});

module.exports = LocalChannel;