// if you have already created your own Component extending AbstractComponent
// you can replace AbstractComponent here and use your own
// ex: var MyComp = require('./path/to/MyComp')
// the only thing needed is that the top level component extends AbstractComponent :)
var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {<%= entityName %>}
 */
var <%= entityName %> = <%= entityType %>.extend({
  toString: '<%= entityName %>',

  /* This is an example of dictionary attribute that you can set for your entity */
//dic_yourAttrName: {
//  optional: true,
//  defaultValue: false
//},

  /**
   * this method will be called by the Kevoree platform when your component has to start
   */
  start: function (_super) {
    _super.call(this);
    // TODO
    this.log.debug(this.toString(), 'START');
  },

  /**
   * this method will be called by the Kevoree platform when your component has to stop
   */
  stop: function (_super) {
    _super.call(this);
    // TODO
    this.log.debug(this.toString(), 'STOP');
  }
});

module.exports = <%= entityName %>;
