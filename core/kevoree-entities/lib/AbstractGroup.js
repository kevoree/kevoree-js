var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractGroup entity
 *
 * @type {AbstractGroup} extends KevoreeEntity
 */
var AbstractGroup = KevoreeEntity.extend({
  toString: 'AbstractGroup',

  /**
   *
   * @param model
   */
  updateModel: function (model) {
    this.kCore.deploy(model);
  }
});

module.exports = AbstractGroup;