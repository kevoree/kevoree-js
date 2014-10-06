var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;
var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');

module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateDictionary',

    construct: function () {
        this.oldDictionaryMap = null;
        this.instance = null;
    },

    execute: function (callback) {
        this._super(callback);

        var kDictionary = this.modelElement.eContainer();
        var instance;
        if (kDictionary.eContainer().name === this.node.getName()) {
            // instance is the current platform node
            instance = this.node;
        } else {
            instance = this.mapper.getObject(kDictionary.eContainer().path());
        }

        if (instance) {
            var dictionary = instance.getDictionary();

            this.oldDictionaryMap = dictionary.cloneMap();
            this.instance = instance;
            if (Kotlin.isType(kDictionary, kevoree.FragmentDictionary)) {
                if (kDictionary.name === this.node.getName()) {
                    this.log.debug(this.toString(), kDictionary.eContainer().name+'.'+this.modelElement.name+'/'+kDictionary.name+' = '+this.modelElement.value);
                    dictionary.setEntry(this.modelElement.name, this.modelElement.value);
                }
            } else {
                this.log.debug(this.toString(), kDictionary.eContainer().name+'.'+this.modelElement.name+' = '+this.modelElement.value);
                dictionary.setEntry(this.modelElement.name, this.modelElement.value);
            }
            callback();
        } else {
            this.log.warn(this.toString(), 'Did not update any dictionary because '+kDictionary.eContainer().path()+' is not related to this platform obvsiouly');
            callback();
        }
    },

    undo: function (callback) {
        this._super(callback);

        if (this.instance != null && this.oldDictionaryMap != null) {
            this.instance.getDictionary().setMap(this.oldDictionaryMap);
        }

        callback();
    }
});