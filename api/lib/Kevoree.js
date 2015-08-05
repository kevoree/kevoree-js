var util      = require('util'),
    Component = require('./tdefs/Component'),
    Node      = require('./tdefs/Node'),
    Group     = require('./tdefs/Group'),
    Channel   = require('./tdefs/Channel');

function Kevoree() {}

Kevoree.prototype.createComponent = function (instance) {
    Component.call(instance);
};

Kevoree.prototype.createNode = function (instance) {
    Node.call(instance);
};

Kevoree.prototype.createGroup = function (instance) {
    Group.call(instance);
};

Kevoree.prototype.createChannel = function (instance) {
    Channel.call(instance);
};

Kevoree.prototype.registerComponent = function (name, typeFunc) {
    util.inherits(typeFunc, Component);
};

Kevoree.prototype.registerNode      = function (name, typeFunc) {
    util.inherits(typeFunc, Node);
};

Kevoree.prototype.registerGroup     = function (name, typeFunc) {
    util.inherits(typeFunc, Group);
};

Kevoree.prototype.registerChannel   = function (name, typeFunc) {
    util.inherits(typeFunc, Channel);
};

module.exports = Kevoree;