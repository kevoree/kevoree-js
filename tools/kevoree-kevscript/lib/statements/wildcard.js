module.exports = function (model, statements, stmt, opts, cb) {
  return stmt.children.join('');
}