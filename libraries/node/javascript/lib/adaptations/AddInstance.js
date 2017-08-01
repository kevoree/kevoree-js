'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const RemoveInstance = require('./RemoveInstance');
const ModelHelper = require('../ModelHelper');

/**
 * AddInstance Adaptation command
 *
 * @type {AddInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'AddInstance',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function () {
    // do not add this node platform instance (this is done by the core)
    if (this.modelElement && (this.modelElement.name !== this.node.getName())) {
      // do not add already added instances
      if (!this.mapper.hasObject(this.modelElement.path())) {
        // retrieve the related installed DeployUnit
        const meta = this.modelElement.typeDefinition
          .select('deployUnits[]/filters[name=platform,value=js]');
        if (meta) {
          if (meta.array.length === 1) {
            const TypeDef = this.mapper.getObject(meta.get(0).eContainer().path());
            if (TypeDef) {
              const instance = new TypeDef(this.node.getKevoreeCore(), this.modelElement, this.node.getName());
              this.log.debug(instance.getName() + ': ' + ModelHelper.getFQN(this.modelElement.typeDefinition));
              this.mapper.addEntry(this.modelElement.path(), instance);
              return Promise.resolve();

            } else {
              // there is no DeployUnit installed for this instance TypeDefinition
              return Promise.reject(new Error(this.toString() + ' error: no DeployUnit installed for ' + this.modelElement.path()));
            }
          } else {
            return Promise.reject(new Error(this.toString() + ' error: TypeDefinitions must only have 1 DeployUnit for a specific platform (found '+meta.array.length+' in \'js\' for '+meta.get(0).eContainer().path()+')'));
          }
        } else {
          return Promise.reject(new Error(this.toString() + ' error: unable to find a DeployUnit \'js\' for ' + this.modelElement.path() + ' in the model'));
        }
      }
    }

    return Promise.resolve();
  },

  undo: function() {
    const cmd = new RemoveInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});
