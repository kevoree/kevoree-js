'use strict';

var kevs = require('./parser');
var interpreter = require('./interpreter');
var modelInterpreter = require('./model-interpreter');
var registryUrl = require('./util/registry-url');
var modelResolverFactory = require('./resolvers/model-resolver-factory');
var registryResolverFactory = require('./resolvers/registry-resolver-factory');

function KevScript(logger, options) {
  if (!logger) {
    throw new Error('The KevScript engine needs a Kevoree logger to be constructed');
  }
  this.options = options || {};
  this.logger = logger;
  this.logger.info('Registry: %s', registryUrl());

  if (!this.options.resolver) {
    // defaults to modelRegistryResolver & registryResolver if nothing given
    this.options.resolver = modelResolverFactory(this.logger, registryResolverFactory(this.logger));
  }
}

KevScript.prototype = {
  toString: function () {
    return 'KevScript';
  },

  /**
   * Parses given KevScript source-code in parameter 'data' and returns a ContainerRoot.
   * @param   {String} data string
   * @param   {Object|Function} [ctxModel] a model to "start" on (in order not to create a model from scratch)
   * @param   {Object|Function} [ctxVars] context variables to be accessible from the KevScript
   * @returns {Promise<{ ContainerRoot, Array<Warning>}} promise
   * @throws  Error on SyntaxError and on source code validity and such
   */
  parse: function (data, ctxModel, ctxVars) {
    this.options.logger = this.logger;
    this.options.ctxVars = ctxVars;
    var options = this.options;

    var parser = new kevs.Parser();
    var ast = parser.parse(data);

    if (ast.type !== 'kevScript') {
      return Promise.resolve({
        error: ast,
        model: null,
        warnings: options.warnings || []
      });
    } else {
      return interpreter(ast, ctxModel, options)
        .then(function (result) {
          if (result.error) {
            result.error.warnings = result.warnings;
            throw result.error;
          } else {
            return { model: result.model, warnings: result.warnings };
          }
        });
    }
  },

  /**
   * Parses a Kevoree model (ContainerRoot) and returns the equivalent KevScript string
   * @param model kevoree ContainerRoot model
   */
  parseModel: function (model) {
    return modelInterpreter(model);
  },

  setOptions: function (options) {
    this.options = options;
  }
};

module.exports = KevScript;
module.exports.Parser = kevs.Parser;
module.exports.Resolvers = require('./resolvers');
