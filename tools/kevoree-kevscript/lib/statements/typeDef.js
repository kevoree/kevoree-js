var path = require('path');

module.exports = function (model, statements, stmt, opts, cb) {
    var typeDef;
    var name = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);

    if (stmt.children[1]) {
        // name & version specified
        typeDef = name + '/' + statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);
    } else {
        // try to find version on my own
        // XXX something like this shouldn't be done here but rather in findTypeDefinitionByID
        var tDefs = model.typeDefinitions.iterator();
        var version = null;
        while (tDefs.hasNext()) {
            var tDef = tDefs.next();
            if (tDef.name === name) {
                // TODO improve that so that it takes the greater and not the first one
                version = tDef.version;
                break;
            }
        }
        typeDef = name + '/' + version;
    }

    return {
        name: name,
        version: version,
        toString: function () {
            return name + '/' + version;
        }
    };
};