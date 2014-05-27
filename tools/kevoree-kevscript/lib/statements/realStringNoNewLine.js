module.exports = function (model, statements, stmt) {
    return stmt.children[0].children.join('');
};