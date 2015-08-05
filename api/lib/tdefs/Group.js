var util = require('util'),
    TypeDefinition = require('./TypeDefinition');

function Group() {
    TypeDefinition.call(this);
}

util.inherits(Group, TypeDefinition);

module.exports = Group;