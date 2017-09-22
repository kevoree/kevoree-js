const kevoree = require('kevoree-library');
const modelValidator = require('kevoree-validator');
const monkeyPatch = require('./util/monkey-patch');

// statements list
const statements = {
  addRepo: require('./statements/addRepo'),
  add: require('./statements/add'),
  move: require('./statements/move'),
  attach: require('./statements/attach'),
  addBinding: require('./statements/addBinding'),
  delBinding: require('./statements/delBinding'),
  include: require('./statements/include'),
  set: require('./statements/set'),
  network: require('./statements/network'),
  remove: require('./statements/remove'),
  detach: require('./statements/detach'),
  namespace: require('./statements/namespace'),
  start: require('./statements/start'),
  stop: require('./statements/stop'),
  pause: require('./statements/pause'),
};

// expressions list
const expressions = {
  typeDef: require('./expressions/typeDef'),
  typeFQN: require('./expressions/typeFQN'),
  nameList: require('./expressions/nameList'),
  instancePath: require('./expressions/instancePath'),
  wildcard: require('./expressions/wildcard'),
  string: require('./expressions/string'),
  string2: require('./expressions/string2'),
  string3: require('./expressions/string3'),
  repoString: require('./expressions/repoString'),
  version: require('./expressions/version'),
  anything: require('./expressions/anything'),
  realString: require('./expressions/realString'),
  realStringNoNewLine: require('./expressions/realStringNoNewLine'),
  newLine: require('./expressions/newLine'),
  singleQuoteLine: require('./expressions/singleQuoteLine'),
  doubleQuoteLine: require('./expressions/doubleQuoteLine'),
  escaped: require('./expressions/escaped'),
  ctxVar: require('./expressions/ctxVar'),
  genCtxVar: require('./expressions/genCtxVar'),
  tdefVersion: require('./expressions/tdefVersion'),
  duVersion: require('./expressions/duVersion'),
  integer: require('./expressions/integer'),
  latest: require('./expressions/latest'),
  release: require('./expressions/release'),
  versionDecl: require('./expressions/versionDecl'),
  versionLine: require('./expressions/versionLine'),
  versionLines: require('./expressions/versionLines'),
};

const factory = new kevoree.factory.DefaultKevoreeFactory();
const cloner = factory.createModelCloner();

/**
 *
 * @param ast
 * @param ctxModel
 * @param opts
 * @param callback
 * @constructor
 */
function interpreter(ast, ctxModel, opts) {
  // output model
  let model = null;

  if (ctxModel) {
    // if we have a context model, clone it and use it has a base
    model = cloner.clone(ctxModel, false);
  } else {
    // otherwise start from a brand new model
    model = factory.createContainerRoot();
  }

  // this ContainerRoot is the root of the model
  factory.root(model);

  opts.warnings = [];
  opts.identifiers = [];

  return Promise.resolve()
    .then(() => {
      // create commands based on interpreted statements & expressions
      const commands = [];
      ast.children.forEach((child0) => {
        child0.children.forEach((stmt) => {
          if (typeof (statements[stmt.type]) === 'function') {
            commands.push(() => {
              return statements[stmt.type](model, expressions, stmt, opts);
            });
          } else {
            throw new Error('Unknown statement "' + stmt.type + '"');
          }
        });
      });
      return commands;
    })
    .then((commands) => {
      // execute commands sequentially
      return commands.reduce((prev, next) => {
        return prev.then(next);
      }, Promise.resolve());
    })
    .then(() => {
      // commands executed successfully => validate output model
      return new Promise((resolve) => {
          modelValidator(model);
          resolve();
        })
        .then(() => {
          // model is valid => return
          return {
            error: null,
            model: model,
            warnings: opts.warnings,
          };
        })
        .catch((err) => {
          // model is not valid
          // try to find instance position for ModelValidationError
          ast.children
            .map((stmt) => {
              return stmt.children[0];
            })
            .filter((stmt) => {
              return stmt.type === 'add';
            })
            .some((addStmt) => {
              const instancePos = addStmt.instances[err.path];
              if (instancePos) {
                err.pos = instancePos;
                return true;
              }
              return false;
            });

          return {
            error: err,
            model: null,
            warnings: opts.warnings,
          };
        })
        .then((result) => {
          // whether it is valid or not => monkey patch model
          monkeyPatch(model);
          return result;
        });
    }, (err) => {
      return {
        error: err,
        model: null,
        warnings: opts.warnings,
      };
    });
}

module.exports = interpreter;
