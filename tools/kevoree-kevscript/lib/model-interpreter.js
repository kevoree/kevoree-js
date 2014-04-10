var repos       = require('./elements/repositories'),
    deployUnits = require('./elements/deployUnits'),
    instances   = require('./elements/instances'),
    attaches    = require('./elements/attaches'),
    bindings    = require('./elements/bindings'),
    sets        = require('./elements/sets'),
    networks    = require('./elements/networks');

/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var kevscript = '';

    kevscript += repos(model);
    kevscript += '\n';
    kevscript += deployUnits(model);
    kevscript += '\n';
    kevscript += instances(model);
    kevscript += '\n';
    kevscript += attaches(model);
    kevscript += '\n';
    kevscript += bindings(model);
    kevscript += '\n';
    kevscript += sets(model);
    kevscript += '\n';
    kevscript += networks(model);

    return kevscript.replace(/^([\n\t\r])+/, '').replace(/([\n\t\r])+$/, '');
};