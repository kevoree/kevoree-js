'use strict';

function ModelObjectMapper() {
  this.map = {};
}

ModelObjectMapper.prototype = {
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
    return (this.map[path] !== undefined && this.map[path] !== null);
  },

  getMap: function () {
    return this.map;
  },

  toString: function () {
    return 'ModelObjectMapper';
  }
};

module.exports = ModelObjectMapper;
