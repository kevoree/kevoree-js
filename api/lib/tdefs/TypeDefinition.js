var util = require('util'),
    events = require('events');

function TypeDefinition() {
    this.name = null;
    this.path = null;
    this.nodeName = null;
}

util.inherits(TypeDefinition, events.EventEmitter);

TypeDefinition.prototype.setName = function (name) {
    this.name = name;
};

TypeDefinition.prototype.getName = function () {
    return this.name;
};

TypeDefinition.prototype.setNodeName = function (name) {
    this.nodeName = name;
};

TypeDefinition.prototype.getNodeName = function () {
    return this.nodeName;
};

TypeDefinition.prototype.setPath = function (path) {
    this.path = path;
};

TypeDefinition.prototype.getPath = function () {
    return this.path;
};

module.exports = TypeDefinition;