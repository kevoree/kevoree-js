const KevScriptError = require('../KevScriptError');
const FQN = require('../util/fqn');

module.exports = function typeFQN(model, expressions, expr) {
  const strings = expr.children
    .filter((expr) => expr.type)
    .map((expr) => expressions[expr.type](model, expressions, expr));


  let namespace, name;
  if (strings.length > 2) {
    throw new KevScriptError('Namespaces should no longer contain dots.', expr.pos);
  } else if (strings.length === 1) {
    // default namespace is 'kevoree'
    namespace = 'kevoree';
    name = strings[0];
  } else {
    namespace = strings[0];
    name = strings[1];
  }

  return new FQN(namespace, name);
};
