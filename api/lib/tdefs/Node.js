var util = require('util'),
    TypeDefinition = require('./TypeDefinition');

function Node() {
    TypeDefinition.call(this);
}

util.inherits(Node, TypeDefinition);

Node.prototype.createAdaptationCommands = function (traces) {
    return [];
};

module.exports = Node;