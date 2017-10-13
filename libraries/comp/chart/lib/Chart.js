const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {Chart}
 */
const Chart = AbstractComponent.extend({
  toString: 'Chart',
  tdef_version: 1,

  dic_xLimit: { defaultValue: 30 },

  in_input() {}
});

module.exports = Chart;
