// if you have already created your own Group extending AbstractGroup
// you can replace AbstractGroup here and use your own
// ex: var MyGroup = require('./path/to/MyGroup')
// the only thing needed is that the top level group extends AbstractGroup :)
var AbstractGroup = require('kevoree-entities').AbstractGroup;

/**
 * Kevoree group
 * @type {<%= entityName %>}
 */
var <%= entityName %> = <%= entityType %>.extend({
  toString: '<%= entityName %>',

  /**
   * this method will be called by the Kevoree platform when your group has to start
   */
  start: function (_super) {
    _super.call(this);
    // TODO
  },

  /**
   * this method will be called by the Kevoree platform when your group has to stop
   */
  stop: function () {
    // TODO
  },

  /**
   * Should define a way to 'contact' targetNodeName and give the given model to it
   * @param model
   * @param targetNodeName
   */
  push: function (model, targetNodeName) {
    // TODO
  },

  /**
   * Should define a way to 'contact' targetNodeName and retrieve its current model
   * @param targetNodeName
   * @param callback function(err, model)
   */
  pull: function (targetNodeName, callback) {
    // TODO
  }

});

module.exports = <%= entityName %>;
