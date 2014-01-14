var AdaptationPrimitive = require('./AdaptationPrimitive'),
  RemoveInstance      = require('./RemoveInstance'),
  kevoree             = require('kevoree-library').org.kevoree,
  Kotlin              = require('kevoree-kotlin'),
  Port                = require('kevoree-entities').Port,
  path                = require('path');

/**
 * AddInstance Adaptation command
 *
 * @type {AddInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'AddInstance',

  /**
   *
   * @param _super AdaptationPrimitive parent
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (_super, callback) {
    _super.call(this, callback);

    // inception check
    if (this.modelElement && (this.modelElement.name != this.node.getName())) {
      // platform related check
      if (this.isRelatedToPlatform(this.modelElement)) {
        var moduleName = this.findSuitableModuleName(this.modelElement);
        if (moduleName != undefined && moduleName != null) {
          try {
            var InstanceClass = require(moduleName);
            var instance = new InstanceClass();
            instance.setKevoreeCore(this.node.getKevoreeCore());
            instance.setName(this.modelElement.name);
            instance.setPath(this.modelElement.path());
            instance.setNodeName(this.node.getName());

            this.doSpecificTypeProcess(this.modelElement);

            this.mapper.addEntry(this.modelElement.path(), instance);

            this.log.debug(this.toString(), 'job done for '+instance.getName()+'@'+this.node.getName());
            return callback();

          } catch (e) {
            return callback(e);
          }

        } else {
          // there is no DeployUnit installed for this instance TypeDefinition
          return callback(new Error(this.toString()+ " error: no DeployUnit installed for "+this.kInstance.path()));
        }
      }
    }

    callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new RemoveInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);
    return;
  },

  findSuitableModuleName: function (kInstance) {
    var du = kInstance.typeDefinition.deployUnit;
    return this.mapper.getObject(du.path());
  },

  doSpecificTypeProcess: function (kInstance) {
    if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      var provided = kInstance.provided;
      for (var i=0; i < provided.size(); i++) {
        var input = provided.get(i);
        this.mapper.addEntry(input.path(), new Port(input.portTypeRef.name, input.path()));
      }

      var required = kInstance.required;
      for (var i=0; i < required.size(); i++) {
        var output = required.get(i);
        this.mapper.addEntry(output.path(), new Port(output.portTypeRef.name, output.path()));
      }
    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
      var bindings = kInstance.bindings.iterator();
      while (bindings.hasNext()) {
        var binding = bindings.next();
        this.mapper.addEntry(binding.port.path(), new Port(binding.port.portTypeRef.name, binding.port.path()));
      }
    }
  }
});