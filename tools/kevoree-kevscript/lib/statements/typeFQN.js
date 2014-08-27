// Created by leiko on 27/08/14 15:15
module.exports = function (model, statements, stmt, opts, cb) {
    var typeFqn = [];
    for (var i in stmt.children) {
        if (typeof (stmt.children[i]) === 'string') {
            typeFqn.push(stmt.children[i]);
        } else {
            typeFqn.push(statements[stmt.children[i].type](model, statements, stmt.children[i], opts, cb));
        }
    }
    return typeFqn.join('');
};