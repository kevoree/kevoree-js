'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');

module.exports = AdaptationPrimitive.extend({
  toString: 'UpdateDictionary',

  construct: function() {
    this.oldDictionaryMap = null;
    this.instance = null;
  },

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    const kDictionary = this.modelElement.eContainer();
    let instance;
    if (kDictionary.eContainer().name === this.node.getName()) {
      // instance is the current platform node
      instance = this.node;
    } else {
      instance = this.mapper.getObject(kDictionary.eContainer().path());
    }

    if (instance) {
      const dictionary = instance.getDictionary();

      this.oldDictionaryMap = dictionary.cloneMap();
      this.instance = instance;
      if (kDictionary.metaClassName() === 'org.kevoree.FragmentDictionary') {
        if (kDictionary.name === this.node.getName()) {
          this.log.debug(kDictionary.eContainer().name + '.' + this.modelElement.name + '/' + kDictionary.name + ' = ' + this.modelElement.value);
          dictionary.setEntry(this.modelElement.name, this.modelElement.value);
        }
      } else {
        this.log.debug(kDictionary.eContainer().name + '.' + this.modelElement.name + ' = ' + this.modelElement.value);
        dictionary.setEntry(this.modelElement.name, this.modelElement.value);
      }
      return Promise.resolve();
    } else {
      this.log.warn('Did not update any dictionary because ' + kDictionary.eContainer().path() + ' is not related to this platform obvsiouly');
      return Promise.resolve();
    }
  },

  undo: function() {
    if (this.instance !== null && this.oldDictionaryMap !== null) {
      this.instance.getDictionary().setMap(this.oldDictionaryMap);
    }
    return Promise.resolve();
  }
});
