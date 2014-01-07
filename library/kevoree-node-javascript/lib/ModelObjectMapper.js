var Class   = require('pseudoclass');

var ModelObjectMapper = Class({
    toString: 'ModelObjectMapper',

    construct: function () {
        this.map = {};
    },

    addEntry: function (path, object) {
        this.map[path] = object;
    },

    removeEntry: function (path) {
        if (this.map[path]) {
            delete this.map[path];
        }
    },

    getObject: function (path) {
        return this.map[path];
    },

    hasObject: function (path) {
        return (this.map[path] != undefined && this.map[path] != null);
    },

    getMap: function () {
        return this.map;
    }
});

module.exports = ModelObjectMapper;