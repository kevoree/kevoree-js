var AdaptationPrimitive = require('./AdaptationPrimitive'),
    AddInstance         = require('./AddInstance'),
    kevoree             = require('kevoree-library').org.kevoree;

/**
 * RemoveInstance Adaptation command
 *
 * @type {RemoveInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveInstance',

  /**
   *
   * @param _super AdaptationPrimitive parent
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (_super, callback) {
    _super.call(this, callback);

    var kInstance = this.node.getKevoreeCore().getCurrentModel().findByPath(this.trace.previousPath || this.trace.objPath);

    if (kInstance) {
      var instance = this.mapper.getObject(kInstance.path());
      if (instance != undefined && instance != null) {
        this.mapper.removeEntry(kInstance.path());
        this.doSpecificTypeProcess(kInstance);
        this.log.debug(this.toString(), 'job done for '+instance.getName()+'@'+this.node.getName());
        return callback();

      } else {
        callback(new Error(this.toString()+" error: unable to remove instance "+kInstance.path()));
        return;
      }
    }

    this.log.debug(this.toString(), 'no work done with '+this.trace.toString()+'@'+this.node.getName());
    return callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new AddInstance(this.node, this.mapper, this.adaptModel, this.trace);
    cmd.execute(callback);
    return;
  },

  doSpecificTypeProcess: function (kInstance) {
    if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      var provided = kInstance.provided;
      for (var i=0; i < provided.size(); i++) {
        this.mapper.removeEntry(provided.get(i).path());
      }

      var required = kInstance.required;
      for (var i=0; i < required.size(); i++) {
        this.mapper.removeEntry(required.get(i).path());
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.GroupTypeImpl)) {


    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.NodeTypeImpl)) {

    }
  }
});