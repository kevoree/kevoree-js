exports.index = function(req, res) {
    res.render('index.html');
}

// exports other rules
exports.resolve     = require('./resolve');
exports.bootstrap   = require('./bootstrap');
