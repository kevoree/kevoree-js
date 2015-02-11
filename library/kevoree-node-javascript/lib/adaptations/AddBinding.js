var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive,
    Port                = require('kevoree-entities').Port,
    Kotlin              = require('kevoree-kotlin');

module.exports = AdaptationPrimitive.extend({
    toString: 'AddBinding',

    execute: function (callback) {
        this._super(callback);

        var bindings, binding;

        var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
            compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
            portInstance = this.mapper.getObject(this.modelElement.port.path());

        if (chanInstance) {
            if (compInstance) {
                if (!portInstance) {
                    portInstance = new Port(this.modelElement.port.name, this.modelElement.port.path());
                    this.mapper.addEntry(this.modelElement.port.path(), portInstance);
                }
                portInstance.setComponent(compInstance);
                portInstance.setChannel(chanInstance);

                var provided = this.modelElement.port.eContainer().findProvidedByID(this.modelElement.port.name);
                if (provided) {
                    // binding related port is an 'in' port type
                    compInstance.addInternalInputPort(portInstance);
                    chanInstance.addInternalInputPort(portInstance);
                    this.log.debug(this.toString(), 'input '+portInstance.getPath()+' <-> '+chanInstance.getPath());
                } else {
                    // binding related port is an 'out' port type
                    // so we need to get all this channel 'in' ports
                    // and give them to this chan fragment
                    compInstance.addInternalOutputPort(portInstance);
                    this.log.debug(this.toString(), 'output '+portInstance.getPath()+' <-> '+chanInstance.getPath());

                    // retrieve every bindings related to this binding chan
                    bindings = this.modelElement.hub.bindings.iterator();
                    while (bindings.hasNext()) {
                        binding = bindings.next();
                        if (binding != this.modelElement) { // ignore this binding because we are already processing it
                            provided = binding.port.eContainer().findProvidedByID(binding.port.name);
                            if (provided) {
                                portInstance = this.mapper.getObject(provided.path());
                                if (!portInstance) {
                                    portInstance = new Port(provided.name, provided.path());
                                    this.mapper.addEntry(provided.path(), portInstance);
                                }
                                chanInstance.addInternalInputPort(portInstance);
                            }
                        }
                    }
                }

                callback();

            } else {
                if (this.modelElement.port.eContainer().eContainer().path() === this.node.getPath()) {
                    callback(new Error(this.toString()+" error: unable to find component "+this.modelElement.port.eContainer().name+" instance on platform."));
                } else {
                    // the component is not related to the current platform, just add the input the channel
                    chanInstance.addInternalInputPort(new Port(this.modelElement.port.name, this.modelElement.port.path()));
                    this.log.debug(this.toString(), 'input '+this.modelElement.port.path()+' <-> '+chanInstance.getPath());
                    callback();
                }
            }
        } else {
            callback(new Error(this.toString()+" error: unable to find channel "+this.modelElement.hub.name+" instance on platform."));
        }
    },

    undo: function (callback) {
        this._super(callback);

        var RemoveBinding = require('./RemoveBinding');
        var cmd = new RemoveBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});