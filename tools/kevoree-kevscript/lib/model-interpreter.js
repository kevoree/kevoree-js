var repos       = require('./elements/repositories'),
    includes    = require('./elements/includes'),
    instances   = require('./elements/instances'),
    attaches    = require('./elements/attaches'),
    lifecycles  = require('./elements/lifecycles'),
    bindings    = require('./elements/bindings'),
    sets        = require('./elements/sets'),
    networks    = require('./elements/networks');

/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var blocks = [
        // order matters !
        repos(model),
        includes(model),
        instances(model),
        lifecycles(model),
        attaches(model),
        bindings(model),
        sets(model),
        networks(model)
    ];

    var kevscript = '';
    for (var i in blocks) {
        kevscript += blocks[i];
        if (blocks[i].length > 0) {
            kevscript += '\n\n';
        }
    }

    return kevscript.replace(/^([\n\t\r])+/, '').replace(/([\n\t\r])+$/, '');
};