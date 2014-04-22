var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractGroup entity
 *
 * @type {AbstractGroup} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
  toString: 'AbstractGroup',

  /**
   *
   * @param model
   */
  updateModel: function (model) {
    this.kCore.deploy(model);
  }
});