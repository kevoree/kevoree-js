module.exports = function (model, statements, stmt, opts) {
    var ret = [];
    for (var i in stmt.children) {
        ret.push(statements[stmt.children[i].type](model, statements, stmt.children[i], opts));
    }
    return ret;
};