var Class           = require('pseudoclass'),
    EventEmitter    = require('events').EventEmitter;

var ADD_EVENT = 'dictionary_add';

var Dictionary = Class({
    toString: 'Dictionary',

    construct: function (entity) {
        this.entity = entity;
        this.emitter = new EventEmitter();
        this.map = {};
        this.length = 0;
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

    /**
     * Adds a listener on the dictionary attribute given that is triggered when added
     * to the dictionary instance.
     * @param attrName attribute to listen to
     * @param callback function (value)
     */
    onAdd: function (attrName, callback) {
        this.emitter.addListener(ADD_EVENT, function (name, value) {
            if (value == attrName) callback(value);
        });
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    getValue: function (name) {
        return this.map[name];
    },

    setValue: function (name, value) {
        var value = this.entity.getModelEntity().dictionary.findValuesByID(name);
        value.value = value;
        this.setEntry(name, value);
    },

    setEntry: function (name, value) {
        if (this.map[name] != undefined) {
            // an entry with the same name already exists in the dictionary
            var oldValue = this.map[name];
            this.map[name] = value;
            // emit update event with the name, oldValue and newValue
            this.emitter.emit(name, value, oldValue);

        } else {
            // no entry with that name exists in the dictionary : add it
            this.map[name] = value;
            this.length++;
            // emit an add event with the entry
            this.emitter.emit(ADD_EVENT, name, value);
        }
    },

    setMap: function (map) {
        if (this.length > 0) {
            // current map is not empty
            for (var newName in map) {
                var alreadyAdded = false;

                for (var name in this.map) {
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
                    this.emitter.emit(ADD_EVENT, newName, this.map[newName]);
                }
            }

        } else {
            // dictionary was empty : set it from scratch
            this.map = map;

            // compute map length
            for (var name in this.map) this.length++;

            // emit add event for each value added in the dictionary
            for (var name in this.map) this.emitter.emit(ADD_EVENT, name, this.map[name]);
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

Dictionary.ADD_EVENT = ADD_EVENT;
module.exports = Dictionary;