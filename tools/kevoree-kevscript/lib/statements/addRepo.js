var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.factory.DefaultKevoreeFactory();

module.exports = function (model, statements, stmt, opts, cb) {
    var url = statements[stmt.children[0].type](model, statements, stmt, opts, cb);

    // create repository & add it to model
    var repo = factory.createRepository();
    repo.url = url;
    model.addRepositories(repo);

    cb();
};