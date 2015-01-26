var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;

module.exports = AdaptationPrimitive.extend({
    toString: 'RemoveBinding',

    execute: function (callback) {
        this._super(callback);

        var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
            compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
            portInstance = this.mapper.getObject(this.modelElement.port.path());

        if (chanInstance && compInstance && portInstance) {
            this.mapper.removeEntry(this.modelElement.port.path());

            var provided = this.modelElement.port.eContainer().findProvidedByID(this.modelElement.port.name);
            if (provided) {
                this.log.debug(this.toString(), 'input '+portInstance.getPath()+' <-> '+chanInstance.getPath());
                compInstance.removeInternalInputPort(portInstance);
                chanInstance.removeInternalInputPort(portInstance);
            } else {
                this.log.debug(this.toString(), 'output '+portInstance.getPath()+' <-> '+chanInstance.getPath());
                compInstance.removeInternalOutputPort(portInstance);
            }

            // retrieve every bindings related to this binding chan
            var bindings = this.modelElement.hub.bindings.iterator();
            while (bindings.hasNext()) {
                var binding = bindings.next();
                if (binding != this.modelElement) { // ignore this binding because we are already processing it
                    provided = binding.port.eContainer().findProvidedByID(binding.port.name);
                    if (provided) {
                        portInstance = this.mapper.getObject(provided.path());
                        if (portInstance) {
                            this.mapper.removeEntry(provided.path());
                            chanInstance.removeInternalInputPort(portInstance);
                        }
                    }
                }
            }
        }

        callback();
    },

    undo: function (callback) {
        this._super(callback);

        var AddBinding = require('./AddBinding');
        var cmd = new AddBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    },

    isInputPortType: function (kPort) {
        var kCompTD = kPort.eContainer().typeDefinition;
        var inputs = kCompTD.provided ? kCompTD.provided.iterator() : null;
        if (inputs) {
            while (inputs.hasNext()) {
                var input = inputs.next();
                if (input.name == kPort.name) return true;
            }
        }

        var outputs = kCompTD.required ? kCompTD.required.iterator() : null;
        if (outputs) {
            while (outputs.hasNext()) {
                var output = outputs.next();
                if (output.name == kPort.name) return false;
            }
        }

        return false;
    }
});