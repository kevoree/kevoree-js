var kevoree = require('kevoree-library').org.kevoree;
var path = require('path');

var factory = new kevoree.factory.DefaultKevoreeFactory();
var compare = factory.createModelCompare();

module.exports = function (model, statements, stmt, opts, cb) {
    if (!cb) {
        // if "cb" is undefined, then  there is no "opts" parameter given, so no resolver, so :/
        return opts(new Error('You must give resolvers as options to "include.js" statement processor'));
    }

    if (!opts.resolvers) return cb(new Error('Unable to process include. No resolver given'));

    var du = factory.createDeployUnit();
    var type = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    var mergeDef = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

    if (opts.resolvers[type]) {
        var colons = mergeDef.split(':');
        var arobas = mergeDef.split('@');
        if (colons.length === 1 && arobas.length === 1) {
            // mergeDef looks like: foo
            du.name = mergeDef;

        } else if (colons.length === 1 && arobas.length === 2) {
            // mergeDef looks like: foo@version
            du.name = arobas[0];
            du.version = arobas[1];

        } else if (colons.length === 2 && arobas.length === 1) {
            // mergeDef looks like: foo:version
            du.name = colons[0];
            du.version = colons[1];

        } else if (colons.length === 3 && arobas.length === 1) {
            // mergeDef looks like: foo:bar:version
            du.groupName = colons[0];
            du.name = colons[1];
            du.version = colons[2];

        } else if (colons.length === 2 && arobas.length === 2) {
            // mergeDef looks like: foo:bar@version
            var subSplit = arobas[0].split(':');
            du.groupName = subSplit[0];
            du.name = subSplit[1];
            du.version = arobas[1];
        }

        opts.resolvers[type].resolve(du, function (err, Clazz, duModel) {
            if (err) return cb(err);

            var loader = factory.createJSONLoader();
            var serializer = factory.createJSONSerializer();

            var tmp = loader.loadModelFromString(serializer.serialize(duModel)).get(0);
            var mergeSeq = compare.merge(model, tmp);
            mergeSeq.applyOn(model);
            return cb();
        });

    } else {
        // no resolver set for include statements with "type"
        return cb(new Error('Error: include '+type+':'+mergeDef+' (Unable to handle "'+type+'" include type. Did you add a resolver for that?)'));
    }
};