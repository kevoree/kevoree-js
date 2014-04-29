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

        var updateDictionary = function (instance) {
            var dictionary = instance.getDictionary();
            this.oldDictionaryMap = dictionary.cloneMap();
            this.instance = instance;
            if (Kotlin.isType(kDictionary, kevoree.impl.FragmentDictionaryImpl)) {
                if (kDictionary.name == this.node.getName()) {
                    dictionary.setEntry(this.modelElement.name, this.modelElement.value);
                }
            } else {
                dictionary.setEntry(this.modelElement.name, this.modelElement.value);
            }

            this.log.debug(this.toString(), kDictionary.eContainer().name+'.'+this.modelElement.name+' = '+this.modelElement.value);
            return callback();
        }.bind(this);

        if (instance != null) {
            return updateDictionary(instance);

        } else {
            if (kDictionary.eContainer().name === this.node.getName()) {
                // this dictionary is for this platform node
                return updateDictionary(this.node);
            }
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