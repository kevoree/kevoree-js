var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (model, statements, stmt, opts, cb) {
    var url = statements[stmt.children[0].type](model, statements, stmt, opts, cb);
    var repo = factory.createRepository();
    repo.url = url;
    model.addRepositories(repo);
    cb();
}