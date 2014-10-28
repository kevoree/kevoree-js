var AbstractChannel = require('kevoree-entities').AbstractChannel;

var LocalChannel = AbstractChannel.extend({
    toString: 'LocalChannel',

    dic_delay: { optional: false, defaultValue: 0, fragmentDependant: false },

    onSend: function (fromPortPath, destPortPaths, msg, callback) {
        // directly dispatching message locally
        // without using client/server architecture because it is the purpose
        // of this channel : only works locally (on the same node)
        setTimeout(function () {
            if (this.started) { // check again because a "stop" could have been requested during "delay" awaiting
                this.localDispatch(msg, callback);
            }
        }.bind(this), this.dictionary.getNumber('delay', 0)); // and applying some delay if requested
    }
});

module.exports = LocalChannel;