var util = require('util'),
    TypeDefinition = require('./TypeDefinition');

function Component() {
    TypeDefinition.call(this);
}

util.inherits(Component, TypeDefinition);

module.exports = Component;