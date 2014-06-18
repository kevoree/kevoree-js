var Class           = require('pseudoclass'),
    kevoree         = require('kevoree-library').org.kevoree,
    EventEmitter    = require('events').EventEmitter;

var factory = new kevoree.impl.DefaultKevoreeFactory();

var ADD_EVENT = 'dictionary_add';

var Dictionary = Class({
    toString: 'Dictionary',

    construct: function (entity) {
        this.entity = entity;
        this.emitter = new EventEmitter();
        this.map = {};
    },

    /**
     * Adds a listener on dictionary changes or on a particular attribute changes
     * dictionary.on('myAttr', function (newVal, oldVal) { ... });
     *
     * @param attrName name of the attribute you want to add a listener on
     * @param callback function (attrNewValue, attrOldValue)
     */
    on: function (attrName, callback) {
        this.emitter.addListener(attrName, callback.bind(this.entity));
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    getValue: function (name) {
        return this.map[name];
    },

    setValue: function (name, value) {
        var entity = this.entity.getModelEntity();
        if (!entity.dictionary) {
            entity.dictionary = factory.createDictionary();
        }
        value = entity.dictionary.findValuesByID(name);
        if (!value) {
            value = factory.createDictionaryValue();
            value.name = name;
            entity.dictionary.addValues(value);
        }
        value.value = value;
        this.setEntry(name, value);
    },

    /**
     * Called by the platform to update the state of the dictionary
     * Triggers a call to dic_<name>.update() and a call to on(<name>, function)
     * @param name attribute name
     * @param value new attribute value
     */
    setEntry: function (name, value) {
        var oldValue = this.map[name];
        this.map[name] = value;
        // emit update event with the name, oldValue and newValue
        if (this.entity.isStarted()) {
            if (this.entity['dic_'+name].update && (typeof this.entity['dic_'+name].update === 'function')) {
                this.entity['dic_'+name].update.bind(this.entity)(value, oldValue);
            }
            this.emitter.emit(name, value, oldValue);
        }
    },

    setMap: function (map) {
        var name;
        if (Object.keys(this.map).length > 0) {
            // current map is not empty
            for (var newName in map) {
                var alreadyAdded = false;

                for (name in this.map) {
                    if (newName == name) {
                        // oldMap and newMap both have this attribute : update needed ?
                        var oldValue = this.map[name];
                        if (oldValue != map[name]) {
                            // map[name] value is different from current value => update
                            this.map[name] = map[name];
                            this.emitter.emit(name, this.map[name], oldValue);
                        }
                        alreadyAdded = true;
                    }
                }

                if (!alreadyAdded) {
                    // newMap has a new attribute to add to currentMap : ADD event
                    this.map[newName] = map[newName];
                }
            }

        } else {
            // dictionary was empty : set it from scratch
            this.map = map;
        }
    },

    getMap: function () {
        return this.map;
    },

    /**
     * Returns this dictionary current cloned map
     * @returns {{}}
     */
    cloneMap: function () {
        var clonedMap = {};
        for (var name in this.map) {
            clonedMap[name] = this.map[name];
        }
        return clonedMap;
    }
});

module.exports = Dictionary;