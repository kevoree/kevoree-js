module.exports = function (model, statements, stmt, opts, cb) {
  var ret = [];
  for (var i in stmt.children) {
    ret.push(statements[stmt.children[i].type](model, statements, stmt.children[i], opts, cb));
  }
  return ret;
};