module.exports = function (model, statements, stmt, opts, cb) {
  opts.namespaces = opts.namespaces || {};
  var name = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  opts.namespaces[name] = [];
}