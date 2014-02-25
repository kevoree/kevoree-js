module.exports = function (model, statements, stmt, opts) {
    return stmt.children.join('');
}