const Class = require('pseudoclass');

/**
 * Abstract AdaptationPrimitive command
 *
 * @class
 */
const AdaptationPrimitive = Class({
  toString: 'AdaptationPrimitive',

  /**
   * Construct an AdaptationPrimitive object
   *
   * @param node AbstractNode platform
   * @param mapper ModelObjectMapper
   * @param model model to deploy (that triggers adaptations)
   * @param modelElement model element linked with this primitive
   *
   * @constructs
   */
  construct(node, mapper, model, modelElement) {
    this.node = node;
    this.mapper = mapper;
    this.adaptModel = model;
    this.modelElement = modelElement;
    this.log = this.node.kCore.loggerFactory.create(this.toString(), this.node.name);
  },

  /**
   * Executes adaptation primitive logics
   * @param callback Function(err, [args]) if 'err' is defined => something went wrong
   */
  execute(callback) {
    if (typeof (callback) !== 'function') {
      throw new Error('Execute method need a callback function as last parameter');
    }
  },

  /**
   * Undo the process done by execute()
   */
  undo(callback) {
    if (typeof (callback) !== 'function') {
      throw new Error('Undo method need a callback function as last parameter');
    }
  }
});

module.exports = AdaptationPrimitive;
