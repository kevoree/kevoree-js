exports.index = function(req, res) {
    res.render('editor.html');
};

exports.load    = require('./load');
exports.merge   = require('./merge');
exports.open    = require('./open');
exports.resolve = require('./resolve');