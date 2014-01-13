exports.index = function(req, res) {
    res.render('editor.html');
};

exports.load    = require('./load');
exports.merge   = require('./merge');
exports.resolve = require('./resolve');