module.exports = function realString(model, expressions, expr, opts) {
  let str = '';
  for (const i in expr.children) {
    if (typeof (expr.children[i]) === 'string') {
      str += expr.children[i];
    } else if (expr.children[i] instanceof Object) {
      str += expressions[expr.children[i].type](model, expressions, expr.children[i], opts);
    }
  }
  return str;
};
