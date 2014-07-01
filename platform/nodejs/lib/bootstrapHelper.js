var path    = require('path'),
    config  = require('../config.json'),
    kevoree = require('kevoree-library').org.kevoree;

var loader  = new kevoree.loader.JSONModelLoader();
var factory = new kevoree.impl.DefaultKevoreeFactory();
var compare = new kevoree.compare.DefaultModelCompare();

var bootstrapModel = function bootstrapModel(options, callback) {
    if (!options.model) options.model = factory.createContainerRoot();

    var node = options.model.findNodesByID(options.nodeName);
    var group = options.model.findGroupsByID(options.groupName);
    if (!node || !group) {
        try {
            var jsNodePackage = require(path.resolve(options.modulesPath, 'node_modules', 'kevoree-node-javascript', 'package.json'));
            var wsGrpPackage = require(path.resolve(options.modulesPath, 'node_modules', 'kevoree-group-websocket', 'package.json'));
            var wsGrpModelJson = require(path.resolve(options.modulesPath, 'node_modules', 'kevoree-group-websocket', 'kevlib.json'));
            var wsGrpModel = loader.loadModelFromString(JSON.stringify(wsGrpModelJson)).get(0);
            var mergeSeq = compare.merge(options.model, wsGrpModel);
            mergeSeq.applyOn(options.model);

            options.logger.warn('No node "'+options.nodeName+'" and/or group "'+options.groupName+'" found in model. Adding default instances..');

            // create a node instance
            var nodeInstance = factory.createContainerNode();
            nodeInstance.name = options.nodeName;
            var nodeTDef = options.model.findTypeDefinitionsByID('JavascriptNode/'+jsNodePackage.version);
            if (!nodeTDef) return callback(new Error('Unable to find JavascriptNode/'+jsNodePackage.version+' TypeDefinition :/'));
            nodeInstance.typeDefinition = nodeTDef;
            // create a default network information
            var net = factory.createNetworkInfo();
            net.name = 'lan';
            var prop = factory.createNetworkProperty();
            prop.name = 'ip';
            prop.value = '127.0.0.1';
            net.addValues(prop);
            nodeInstance.addNetworkInformation(net);
            options.model.addNodes(nodeInstance);

            // create a group instance
            var grpInstance = factory.createGroup();
            grpInstance.name = options.groupName;
            var grpTDef = options.model.findTypeDefinitionsByID('WebSocketGroup/'+wsGrpPackage.version);
            if (!grpTDef) return callback(new Error('Unable to find WebSocketGroup/'+wsGrpPackage.version+' TypeDefinition :/'));
            grpInstance.typeDefinition = grpTDef;

            // TODO watch out here: those lines are REALLY implem-dependant and are here (as the filename says 'helper')
            // just so you don't have to bother for default bootstrap. But if you change WebSocketGroup implem, this is going
            // to explose like crazy. You have been warned.
            var fragDic = factory.createFragmentDictionary();
            fragDic.name = options.nodeName;
            var portVal = factory.createDictionaryValue();
            portVal.name = 'port';
            portVal.value = config.groupPort || '9000';
            fragDic.addValues(portVal);
            grpInstance.addFragmentDictionary(fragDic);
            grpInstance.addSubNodes(nodeInstance);
            options.model.addGroups(grpInstance);

        } catch (err) {
            return callback(err);
        }
    }

    return callback(null, options.model);
};

module.exports = function (options, callback) {
    if (!options.model) {
        options.logger.warn('No bootstrap model given: using a default bootstrap model');
        defaultBootstrap();

    } else {
        if (options.model.findNodesByID(options.nodeName) && options.model.findGroupsByID(options.groupName)) {
            // we dont have to process this model anymore, everything is in it :)
            return callback(null, options.model);
        } else {
            defaultBootstrap();
        }
    }

    function defaultBootstrap() {
        var deployUnit = factory.createDeployUnit();
        deployUnit.name = 'kevoree-node-javascript';
        options.bootstrapper.bootstrap(deployUnit, false, function (err, Clazz, nodeModel) {
            if (err) return callback(err);

            deployUnit.name = 'kevoree-group-websocket';
            options.bootstrapper.bootstrap(deployUnit, function (err, Clazz_, grpModel) {
                if (err) return callback(err);

                compare.merge(nodeModel, grpModel).applyOn(nodeModel);
                options.model = nodeModel;
                bootstrapModel(options, callback);
            });
        });
    }
};