var AdaptationPrimitive = require('./AdaptationPrimitive');
var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');

module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateDictionary',

    construct: function () {
        this.oldDictionaryMap = null;
        this.instance = null;
    },

    execute: function (_super, callback) {
        _super.call(this, callback);

        var instance = this.findEntityInstance();
        var kDictionary = this.modelElement.eContainer();

        if (instance != null) {
            var dictionary = instance.getDictionary();
            this.oldDictionaryMap = dictionary.cloneMap();
            this.instance = instance;
            if (Kotlin.isType(kDictionary, kevoree.impl.FragmentDictionaryImpl)) {
                if (kDictionary.name == this.node.getName()) {
                    dictionary.setEntry(this.modelElement.name, this.modelElement.value);
                    if (instance['dic_'+this.modelElement.name]) {
                        instance['dic_'+this.modelElement.name].value = this.modelElement.value;
                    }
                }
            } else {
                dictionary.setEntry(this.modelElement.name, this.modelElement.value);
            }

            this.log.debug(this.toString(), 'job done for attribute '+this.modelElement.name+'@'+this.node.getName());
            return callback();

        } else {
            // TODO handle node's platform attributes
            // TODO(instance == null ==> maybe this attribute is related to the node and not one of its contained object)
//      if (Kotlin.isType(kDictionary, kevoree.impl.FragmentDictionaryImpl)) {
//        if (kDictionary.name == this.node.getName()) {
//          var dictionary = this.node.getDictionary();
//          this.oldDictionaryMap = dictionary.cloneMap();
//          this.instance = this.node;
//          dictionary.setEntry(dicValue.name, dicValue.value);
//        }
//      } else {
//        dictionary.setEntry(dicValue.name, dicValue.value);
//      }
//      // check if this attribute is related to the running platform node type
//      if (dicValue.eContainer().eContainer().name == this.node.toString()
//        || dicValue.eContainer().eContainer().name == this.node.getName()) {
//        var dictionary = this.node.getDictionary();
//        this.oldDictionary = dictionary.clone();
//        this.instance = this.node;
//        dictionary.setEntry(dicValue.attribute.name, dicValue.value);
//      }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        if (this.instance != null && this.oldDictionaryMap != null) {
            this.instance.getDictionary().setMap(this.oldDictionaryMap);
        }

        callback();
    },

    findEntityInstance: function () {
        for (var path in this.mapper.getMap()) {
            if (this.modelElement.path().startsWith(path)) {
                return this.mapper.getObject(path);
            }
        }
        return null;
    }
});