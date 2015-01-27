var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @class
 */
var AbstractChannel = KevoreeEntity.extend({
    toString: 'AbstractChannel',

    /**
     * @constructs
     */
    construct: function () {
        this.inputs = {};
    },

    /**
     * @param {String} outputPath
     * @param {String} msg
     * @param {Function} callback
     */
    internalSend: function (outputPath, msg, callback) {
        var paths = [];
        for (var inputPath in this.inputs) {
            if (this.inputs.hasOwnProperty(inputPath)) {
                // do not send message to stopped component
                var model = this.getKevoreeCore().getCurrentModel();
                if (model) {
                    var port = model.findByPath(inputPath);
                    if (port) {
                        var comp = port.eContainer();
                        if (comp && comp.started) {
                            paths.push(inputPath);
                        }
                    }
                }
            }
        }

        if (this.started) {
            this.onSend(outputPath, paths, msg, callback);
        }
    },

    /**
     *
     * @param {String} fromPortPath
     * @param {Array} destPortPaths Array
     * @param {String} msg
     * @param {Function} callback
     *
     * @abstract
     */
    onSend: function (fromPortPath, destPortPaths, msg, callback) {},

    /**
     * Dispatch messages to all bound ports
     * @param msg
     * @param {Function} [callback]
     */
    localDispatch: function (msg, callback) {
        // javascript trick to convert msg to an array if it isn't already one
        msg = [].concat(msg);

        // if no callback given, then prevent exception to be thrown
        callback = callback || function () {};

        for (var path in this.inputs) {
            if (this.inputs.hasOwnProperty(path)) {
                var port = this.inputs[path];
                var comp = port.getComponent();
                if (comp !== null && port.getInputPortMethodName() !== null && typeof comp[port.getInputPortMethodName()] === 'function') {
                    if (comp.getModelEntity().started) {
                        // call component's input port function with 'msg' parameter
                        try {
                            var res = comp[port.getInputPortMethodName()].apply(comp, msg);
                            callback(null, res);

                        } catch (err) {
                            var error = new Error('Exception thrown when processing '+comp.getName()+'.'+port.getInputPortMethodName()+'(...) @'+this.getNodeName());
                            error.message += ':\n\t' + err.message;
                            callback(error);
                            this.log.error(this.toString(), error.message);
                        }
                    } else {
                        var errMsg = 'Component '+comp.getName()+'@'+this.getNodeName()+' is stopped. Drop message.';
                        callback(new Error(errMsg));
                        this.log.debug(this.toString(), errMsg);
                    }
                }
            }
        }
    },

    /**
     * Returns this channel output port paths
     * @returns {Array}
     */
    getOutputs: function () {
        var outputs = [];

        var chan = this.getModelEntity();
        if (chan) {
            chan.bindings.array.forEach(function (binding) {
                if (binding.port && binding.port.getRefInParent() === 'required') {
                    if (binding.port.eContainer().eContainer().name === this.getNodeName()) {
                        outputs.push(binding.port.path());
                    }
                }
            }.bind(this));
        }

        return outputs;
    },

    /**
     * Returns this channel input port paths
     * @returns {Array}
     */
    getInputs: function () {
        var inputs = [];

        var chan = this.getModelEntity();
        if (chan) {
            chan.bindings.array.forEach(function (binding) {
                if (binding.port && binding.port.getRefInParent() === 'provided') {
                    if (binding.port.eContainer().eContainer().name === this.getNodeName()) {
                        inputs.push(binding.port.path());
                    }
                }
            }.bind(this));
        }

        return inputs;
    },

    /**
     *
     * @param port
     */
    addInternalInputPort: function (port) {
        this.inputs[port.getPath()] = port;
    },

    /**
     *
     * @param port
     */
    removeInternalInputPort: function (port) {
        delete this.inputs[port.getPath()];
    }
});

module.exports = AbstractChannel;