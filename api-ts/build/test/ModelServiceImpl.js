var ModelServiceImpl = (function () {
    function ModelServiceImpl(nodeName, instanceName, model, deployingModel) {
        this.nodeName = nodeName;
        this.instanceName = instanceName;
        this.model = model;
        this.deployingModel = deployingModel;
    }
    ModelServiceImpl.prototype.getName = function () {
        return this.instanceName;
    };
    ModelServiceImpl.prototype.getPath = function () {
        return "nodes[" + this.nodeName + "]/components[" + this.instanceName + "]";
    };
    ModelServiceImpl.prototype.getNodeName = function () {
        return this.nodeName;
    };
    ModelServiceImpl.prototype.getCurrentModel = function () {
        return this.model;
    };
    ModelServiceImpl.prototype.getDeployingModel = function () {
        return this.deployingModel;
    };
    ModelServiceImpl.prototype.getModelInstance = function () {
        return (this.deployingModel || this.model).findByPath(this.getPath());
    };
    ModelServiceImpl.prototype.deploy = function (done) {
    };
    return ModelServiceImpl;
})();
exports.ModelServiceImpl = ModelServiceImpl;
