var Class           = require('pseudoclass'),
    kevoree         = require('kevoree-library').org.kevoree,
    EventEmitter    = require('events').EventEmitter;

var factory = new kevoree.factory.DefaultKevoreeFactory();

/**
 * Dictionary class use to handle KevoreeEntities dictionary attributes
 * <br/>
 * Each KevoreeEntity can create a dictionary attribute by adding a new <strong>dic_field</strong> to their class:
 * <br/>
 * <pre>
 * dic_myAttr: {
 *   optional: true,
 *   defaultValue: 'foo',
 *   fragmentDependant: false
 * }
 * </pre>
 * Dictionary attribute API follows those guidelines:
 * <ul>
 *   <li>"defaultValue" attribute is <b>optional</b>, type is <b>string|boolean</b></li>
 *   <li>"optional" attribute is <b>optional</b>, type is <b>boolean</b> (default: true)</li>
 *   <li>"fragmentDependant" attribute is <b>optional</b>, type is <b>boolean</b> (default: false)</li>
 *   <li>"datatype" attribute is <b>optional</b>, type is <b>string|org.kevoree.Datatype</b></li>
 * </ul>
 *
 * Once your entity is started, you will be able to retrieve your attribute value by calling one of those methods:
 * <ul>
 *     <li>this.dictionary.getValue('myAttr')</li>
 *     <li>this.dictionary.getString('myAttr')</li>
 *     <li>this.dictionary.getNumber('myAttr')</li>
 *     <li>this.dictionary.getBoolean('myAttr')</li>
 * </ul>
 *
 * @class
 */
var Dictionary = Class({
    toString: 'Dictionary',

    /**
     * @param entity
     *
     * @constructs
     */
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

    /**
     * Removes a listener
     * @param event
     * @param callback
     */
    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    /**
     * Retrieve a value mapped by the key "name"
     * @param {String} name the key
     * @returns {*}
     */
    getValue: function (name) {
        return this.map[name];
    },

    /**
     * Returns a boolean for the given dictionary attribute name.
     * If no value is found and no defaultVal is given, it will return "false"
     * If a defaultVal is given, and no value is found in dictionary, then defaultVal is returned
     * @param name
     * @param [defaultVal] a default boolean to return if no value is found in the dictionary using the given name
     * @returns {Boolean}
     */
    getBoolean: function (name, defaultVal) {
        var val = this.map[name];
        if (val === 'true' || val === 'false') {
            return val === 'true';
        }

        if (typeof (defaultVal) === 'undefined') {
            defaultVal = false;
        }

        return defaultVal;
    },

    /**
     * Returns a string for the given dictionary attribute name.
     * If no value is found and no defaultVal is given, it will return "null"
     * (nb: it will also return "null" if the given defaultVal is not a string)
     * If a defaultVal is given, and no value is found in dictionary, then defaultVal is returned
     * @param name
     * @param [defaultVal] a default string to return if no value is found in the dictionary using the given name
     * @returns {String}
     */
    getString: function (name, defaultVal) {
        var val = this.map[name];

        if (typeof (val) === 'string') {
            return val;
        }

        if (typeof (defaultVal) !== 'string') {
            defaultVal = null;
        }

        return defaultVal;
    },

    /**
     * Returns a number for the given dictionary attribute name.
     * If no value is found and no defaultVal is given, it will return "null"
     * (nb: it will also return "null" if the given defaultVal is not a number)
     * If a defaultVal is given, and no value is found in dictionary, then defaultVal is returned
     * @param name
     * @param [defaultVal] a default number to return if no value is found in the dictionary using the given name
     * @returns {Number}
     */
    getNumber: function (name, defaultVal) {
        var val = this.map[name];

        if (!isNaN(Number(val))) {
            return val;
        }

        if (typeof (defaultVal) !== 'number') {
            defaultVal = null;
        }

        return defaultVal;
    },

    /**
     *
     * @param name
     * @param value
     */
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

    /**
     *
     * @param map
     */
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

    /**
     *
     * @returns {{}|*}
     */
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