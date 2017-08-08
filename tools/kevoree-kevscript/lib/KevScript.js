const kevs = require('./parser');
const interpreter = require('./interpreter');
const modelInterpreter = require('./model-interpreter');
const registryUrl = require('./util/registry-url');
const modelResolverFactory = require('./resolvers/model-resolver-factory');
const registryResolverFactory = require('./resolvers/registry-resolver-factory');

function KevScript(logger, options) {
  if (!logger) {
    throw new Error('The KevScript engine needs a Kevoree logger to be constructed');
  }
  this.options = options || {};
  this.logger = logger;
  this.logger.info('Registry: ' + registryUrl());

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
    const options = this.options;

    const parser = new kevs.Parser();
    const ast = parser.parse(data);

    if (ast.type !== 'kevScript') {
      const err = new Error('Unable to parse script');
      err.parser = ast;
      err.warnings = options.warnings || [];
      return Promise.reject(err);
    } else {
      return interpreter(ast, ctxModel, options)
        .then(({ error, warnings, model }) => {
          if (error) {
            error.warnings = warnings;
            throw error;
          } else {
            return { model, warnings };
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
