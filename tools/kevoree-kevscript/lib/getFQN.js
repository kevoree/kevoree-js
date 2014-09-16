// Created by leiko on 16/09/14 17:18
module.exports = function getFQN(tdef) {
    var fqn = tdef.name+'/'+tdef.version;
    function walk(pkg) {
        if (pkg.eContainer()) {
            fqn = pkg.name + '.' + fqn;
            walk(pkg.eContainer());
        }
    }

    walk(tdef.eContainer());

    return fqn;
};