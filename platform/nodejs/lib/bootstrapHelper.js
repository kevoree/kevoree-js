var path    = require('path'),
    os      = require('os'),
    kevoree = require('kevoree-library').org.kevoree;

var factory = new kevoree.factory.DefaultKevoreeFactory();
var loader  = factory.createJSONLoader();
var compare = factory.createModelCompare();

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
            nodeInstance.started = true;
            var nodeTDef = options.model.findByPath('packages[org]/packages[kevoree]/packages[library]/typeDefinitions[name=JavascriptNode,version='+jsNodePackage.version+']');
            if (!nodeTDef) {
                callback(new Error('Unable to find name=JavascriptNode,version='+jsNodePackage.version+' TypeDefinition :/'));
                return;
            }
            nodeInstance.typeDefinition = nodeTDef;
            // create a default network information
            var net = factory.createNetworkInfo();
            net.name = 'ip';
            var nets = os.networkInterfaces();
            for (var iface in nets) {
                if (nets.hasOwnProperty(iface)) {
                    var prop = factory.createValue();
                    prop.name = iface+'_'+nets[iface][0].family;
                    prop.value = nets[iface][0].address;
                    net.addValues(prop);
                }
            }
            nodeInstance.addNetworkInformation(net);
            options.model.addNodes(nodeInstance);

            // create a group instance
            var grpInstance = factory.createGroup();
            grpInstance.name = options.groupName;
            grpInstance.started = true;
            var grpTDef = options.model.findByPath('packages[org]/packages[kevoree]/packages[library]/typeDefinitions[name=WebSocketGroup,version='+wsGrpPackage.version+']');
            if (!grpTDef) {
                callback(new Error('Unable to find name=WebSocketGroup,version='+wsGrpPackage.version+' TypeDefinition :/'));
                return;
            }
            grpInstance.typeDefinition = grpTDef;

            // TODO watch out here: those lines are REALLY implem-dependant and are here (as the filename says 'helper')
            // just so you don't have to bother for default bootstrap. But if you change WebSocketGroup implem, this is going
            // to explose like crazy. You have been warned.
            var fragDic = factory.createFragmentDictionary();
            fragDic.name = options.nodeName;
            var portVal = factory.createValue();
            portVal.name = 'port';
            portVal.value = '9000';
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