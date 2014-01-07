module.exports = function (model, statements, stmt, opts, cb) {
  var name = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);

  if (stmt.children[1]) {
    return name + '/' + statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);
  } else {
    return name;
  }
}