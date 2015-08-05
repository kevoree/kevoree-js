var kevoree = require('kevoree-library');
var factory = new kevoree.factory.DefaultKevoreeFactory();

function fakeKevoree(model, tdefVersion) {
    var pkg = model.packages.array[0],
        du  = pkg.deployUnits.array[0];

    function addToModel(tdef) {
        tdef.version = tdefVersion;
        tdef.addDeployUnits(du);
        pkg.addTypeDefinitions(tdef);
    }

    return {
        createComponent: noop,
        createNode:      noop,
        createGroup:     noop,
        createChannel:   noop,

        registerComponent: function (name, typeFunc) {
            var tdef = factory.createComponentType();
            tdef.name = name;
            addToModel(tdef);
        },

        registerNode: function (name, typeFunc) {
            var tdef = factory.createNodeType();
            tdef.name = name;
            addToModel(tdef);
        }
    };
}

function noop() {}

module.exports = fakeKevoree;