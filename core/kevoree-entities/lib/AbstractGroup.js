const KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractGroup entity
 *
 * @class
 */
const AbstractGroup = KevoreeEntity.extend({
  toString: 'AbstractGroup',

  /**
   *
   * @param model
   */
  updateModel(model) {
    this.kCore.deploy(model);
  }
});

module.exports = AbstractGroup;
