var semver = require('semver');
var getModel = require('kevoree-registry-client').get;
var kevoree = require('kevoree-library').org.kevoree;

module.exports = function (model, statements, stmt, opts, cb) {
    var tdef;
    var fqn = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    var version = '*';

    if (stmt.children[1]) {
        version = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);
    }

    fqn = fqn.split('.');
    var name = fqn.pop();

    var path = 'packages[';
    for (var i=0; i < fqn.length; i++) {
        if (i === fqn.length -1) {
            path += fqn[i] + ']/typeDefinitions[';
        } else {
            path += fqn[i] + ']/packages[';
        }
    }
    path += 'name=' + name + ',version=' + version + ']';

    var tdefs = model.select(path).array;
    if (tdefs.length === 0) {
        // retrieve model from registry.kevoree.org
        var options = {fqn: fqn.join('.')+'.'+name, version: version};
        getModel(options, function (err, tdefModel) {
            if (err) {
                cb(new Error('Unable to find "'+options.fqn+'/'+options.version+'" in current model nor on Kevoree registry.'));
            } else {
                var factory = new kevoree.factory.DefaultKevoreeFactory();
                var loader = factory.createJSONLoader();
                tdefModel = loader.loadModelFromString(tdefModel).get(0);

                tdefs = tdefModel.select(path).array;
                if (tdefs.length === 0) {
                    cb(new Error('Unable to find "'+options.fqn+'/'+options.version+'" on Kevoree registry.'));

                } else {
                    var compare = factory.createModelCompare();
                    var mergeSeq = compare.merge(model, tdefModel);
                    mergeSeq.applyOn(model);

                    if (tdefs.length === 1) {
                        // this version is already in the model
                        cb(null, tdefs[0]);
                    } else {
                        // take the greater version
                        tdef = tdefs[0];
                        for (var j=0; j < tdefs.length; j++) {
                            if (semver.gt(tdefs[j].version, tdef.version)) {
                                tdef = tdefs[j];
                            }
                        }
                        cb(null, tdef);
                    }
                }
            }
        });

    } else if (tdefs.length === 1) {
        // this version is already in the model
        cb(null, tdefs[0]);
    } else {
        // take the greater version
        tdef = tdefs[0];
        for (var j=0; j < tdefs.length; j++) {
            if (semver.gt(tdefs[j].version, tdef.version)) {
                tdef = tdefs[j];
            }
        }
        cb(null, tdef);
    }
};