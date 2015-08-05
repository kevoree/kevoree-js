var util = require('util'),
    events = require('events'),
    kevoree = require('kevoree-library');

var factory = new kevoree.factory.DefaultKevoreeFactory();

function Core() {
    this.model = factory.createContainerRoot();
    factory.root(this.model);

    this.pendingModels = [];
    this.deployingModel = null;
    this.deploying = false;
    this.nodeName = null;
    this.nodeInstance = null;
    this.logger = console;
    this.resolver = null;
    this.internalEmitter = new events.EventEmitter();
}

util.inherits(Core, events.EventEmitter);

Core.prototype.start = function (name) {
    this.nodeName = name;
    var core = this;

    this.internalEmitter.on('stop', function () {
        clearInterval(loop);
        core.logger.log('core stopped');
    });

    var loop = setInterval(function () {
        if (!core.deploying) {
            var item = core.pendingModels.shift();
            if (item) {
                core._doDeploy(item);
            }
        }
    });

    this.internalEmitter.on('rollbackModel', function (item) {
        core.pendingModels.push(item);
    });

    this.logger.log('core started: waiting for a model with a node named "%s"', this.nodeName);
};

Core.prototype.stop = function () {
    this.internalEmitter.emit('stop');
};

Core.prototype.bootstrap = function (model, callback) {
    if (model && typeof model.findNodesByID === 'function') { // TODO check model version
        var node = model.findNodesByID(this.nodeName);
        if (node) {
            // TODO bootstrap node
            var meta = node.typeDefinition.select('deployUnits[*]/filters[name=platform,value=javascript]');
            if (meta.size() === 1) {
                var du = meta.get(0).eContainer();
                this.resolver.resolve(du, function (err, Node) {
                    if (err) {
                        callback(err);
                    } else {
                        var nodeInstance = new Node();
                        callback();
                    }
                });
            } else {
                callback(new Error('Unable to find a compatible DeployUnit for node "'+this.nodeName+'" in model (must be compatible with "javascript")'));
            }
        } else {
            callback(new Error('Unable to find node "'+this.nodeName+'" in model'));
        }
    } else {
        callback(new Error('Model is null or not of the right type'));
    }
};

Core.prototype.deploy = function (model, callback) {
    if (model && typeof model.findNodesByID === 'function') { // TODO check model version
        if (model.findNodesByID(this.nodeName)) {
            // TODO check if there is not too much models pending
            this.pendingModels.push({
                model: model,
                callback: callback
            });
        } else {
            callback(new Error('Unable to find node "'+this.nodeName+'" in model'));
        }
    } else {
        callback(new Error('Model is null or not of the right type'));
    }
};

Core.prototype._doDeploy = function (item) {
    this.logger.log('deploying model...');
    var core = this;
    core.deploying = true;
    try {
        // TODO do adaptations
        // given model is defined and not null
        // clone model so that adaptations won't modify the current one
        var cloner = factory.createModelCloner();
        core.deployingModel = cloner.clone(item.model, true);
        // set it read-only to ensure adaptations consistency
        core.deployingModel.setRecursiveReadOnly();
        // make a diff between the current model and the model to deploy
        var diffSeq = factory.createModelCompare().diff(core.model, core.deployingModel);
        console.log(diffSeq.traces.array);
        // ask the node platform to create the needed adaptation primitives
        //var adaptations = core.nodeInstance.processTraces(diffSeq, core.deployingModel);
        //var cmdStack = [];

        item.callback();
    } catch (err) {
        // error doing adaptations => rollback
        item.callback(err);
    } finally {
        core.deploying = false;
        core.deployingModel = null;
    }
};

Core.prototype.getModel = function () {
    return this.model;
};

Core.prototype.getDeployingModel = function () {
    return this.deployingModel;
};

Core.prototype.isDeploying = function () {
    return this.deploying;
};

Core.prototype.setLogger = function (logger) {
    this.logger = logger;
};

Core.prototype.setResolver = function (resolver) {
    this.resolver = resolver;
};

module.exports = Core;