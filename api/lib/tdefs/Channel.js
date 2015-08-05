var util = require('util'),
    TypeDefinition = require('./TypeDefinition');

function Channel() {
    TypeDefinition.call(this);
}

util.inherits(Channel, TypeDefinition);

module.exports = Channel;