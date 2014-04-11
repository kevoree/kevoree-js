module.exports = function (model, statements, stmt, opts) {
    var str = '';
    for (var i in stmt.children) {
        if (typeof (stmt.children[i]) === 'string') {
            str += stmt.children[i];
        } else if (stmt.children[i] instanceof Object) {
            str += statements[stmt.children[i].type](model, statements, stmt.children[i], opts);
        }
    }
    return str;
};