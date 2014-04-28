var AdaptationPrimitive = require('./AdaptationPrimitive'),
    RemoveBinding       = require('./RemoveBinding'),
    Kotlin              = require('kevoree-kotlin'),
    kevoree             = require('kevoree-library').org.kevoree;

module.exports = AdaptationPrimitive.extend({
    toString: 'AddBinding',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement.port.eContainer().eContainer().name === this.node.getName()) {
            // this binding is related to the current node platform
            var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
                compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
                portInstance = this.mapper.getObject(this.modelElement.port.path());

            if (chanInstance && compInstance) {
                try {
                    portInstance.setComponent(compInstance);
                    portInstance.setChannel(chanInstance);

                    if (this.isInputPortType(this.modelElement.port)) {
                        // binding related port is an 'in' port type
                        compInstance.addInternalInputPort(portInstance);
                        chanInstance.addInternalInputPort(portInstance);
                        this.log.debug(this.toString(), 'new input binding between '+portInstance.getPath()+' and '+chanInstance.getPath());
                    } else {
                        // binding related port is an 'out' port type
                        // so we need to get all this channel 'in' ports
                        // and give them to this chan fragment
                        compInstance.addInternalOutputPort(portInstance);
                        this.log.debug(this.toString(), 'new output binding between '+portInstance.getPath()+' and '+chanInstance.getPath());

                        // retrieve every bindings related to this binding chan
                        var bindings = this.modelElement.hub.bindings.iterator();
                        while (bindings.hasNext()) {
                            var binding = bindings.next();
                            if (binding != this.modelElement) { // ignore this binding because we are already processing it
                                if (this.isInputPortType(binding.port)) {
                                    chanInstance.addInternalInputPort(this.mapper.getObject(binding.port.path()));
                                }
                            }
                        }
                    }

                    return callback();

                } catch (err) {
                    return callback(err);
                }

            } else {
                return callback(new Error(this.toString()+" error: unable to find channel or component instance(s)."));
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new RemoveBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    },

    isInputPortType: function (kPort) {
        return (kPort.getRefInParent() === 'provided');
    }
});