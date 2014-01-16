var AdaptationPrimitive = require('./AdaptationPrimitive'),
    AddBinding          = require('./AddBinding');

module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveBinding',

  execute: function (_super, callback) {
    _super.call(this, callback);

    if (this.modelElement && this.modelElement.port.eContainer().eContainer().name == this.node.getName()) {
      // this binding is related to the current node platform
      var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
          compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
          portInstance = this.mapper.getObject(this.modelElement.port.path());

      if (chanInstance && compInstance) {
        try {
          if (this.isInputPortType(this.modelElement.port)) {
            compInstance.removeInternalInputPort(portInstance);
            chanInstance.removeInternalInputPort(portInstance);
          } else {
            compInstance.removeInternalOutputPort(portInstance);
          }

          this.log.debug(this.toString(), 'job done between '+compInstance.getName()+'@'+this.node.getName()+' and '+chanInstance.getName()+'@'+this.node.getName());
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

    var cmd = new AddBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);

    return;
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