var resolver = require('../instance-resolver');

/**
 * Created by leiko on 19/06/14.
 */
module.exports = function (model, statements, stmt, opts, cb) {
    var error = null;
    try {
        var instances = resolver.resolve(model, stmt.children[0]);
        for (var i=0; i < instances.length; i++) {
            instances[i].started = true;
        }
    } catch (err) {
        var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
        err.message += ' ('+stmt.type+' '+nameList.join(', ')+')';
        error = err;
    } finally {
        cb(error);
    }
};