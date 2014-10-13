var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @type {AbstractChannel} extends KevoreeEntity
 */
var AbstractChannel = KevoreeEntity.extend({
    toString: 'AbstractChannel',

    construct: function () {
        this.inputs = {};
    },

    internalSend: function (outputPath, msg) {
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
            this.onSend(outputPath, paths, msg);
        }
    },

    /**
     *
     * @param fromPortPath
     * @param destPortPaths Array
     * @param msg
     */
    onSend: function (fromPortPath, destPortPaths, msg) {},

    /**
     * Dispatch messages to all bound ports
     * @param msg
     */
    localDispatch: function (msg) {
        for (var path in this.inputs) {
            if (this.inputs.hasOwnProperty(path)) {
                var port = this.inputs[path];
                var comp = port.getComponent();
                if (comp != null && port.getInputPortMethodName() != null && typeof comp[port.getInputPortMethodName()] === 'function') {
                    if (comp.getModelEntity().started) {
                        // call component's input port function with 'msg' parameter
                        comp[port.getInputPortMethodName()](msg);
                    } else {
                        this.log.debug(this.toString(), 'Component '+comp.getName()+'@'+this.getNodeName()+' is stopped. Drop message.');
                    }
                }
            }
        }
    },

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

    addInternalInputPort: function (port) {
        this.inputs[port.getPath()] = port;
    },

    removeInternalInputPort: function (port) {
        delete this.inputs[port.getPath()];
    }
});

module.exports = AbstractChannel;