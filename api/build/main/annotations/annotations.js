require('reflect-metadata');
var Types_1 = require('./Types');
function typeDefinition(target, meta) {
    Reflect.defineMetadata('Name', target.name, target.prototype);
    Reflect.defineMetadata('Meta', meta || {}, target.prototype);
    if (!Reflect.hasMetadata('Params', target.prototype)) {
        Reflect.defineMetadata('Params', [], target.prototype);
    }
    if (!Reflect.hasMetadata('Injects', target.prototype)) {
        Reflect.defineMetadata('Injects', [], target.prototype);
    }
    if (!Reflect.hasMetadata('Inputs', target.prototype)) {
        Reflect.defineMetadata('Inputs', [], target.prototype);
    }
    if (!Reflect.hasMetadata('Outputs', target.prototype)) {
        Reflect.defineMetadata('Outputs', [], target.prototype);
    }
}
function Channel(meta) {
    return function (target) {
        Reflect.defineMetadata('Type', Types_1.Types.Channel, target.prototype);
        typeDefinition(target, meta);
    };
}
exports.Channel = Channel;
function Component(meta) {
    return function (target) {
        Reflect.defineMetadata('Type', Types_1.Types.Component, target.prototype);
        typeDefinition(target, meta);
    };
}
exports.Component = Component;
function Group(meta) {
    return function (target) {
        Reflect.defineMetadata('Type', Types_1.Types.Group, target.prototype);
        typeDefinition(target, meta);
    };
}
exports.Group = Group;
function Node(meta) {
    return function (target) {
        Reflect.defineMetadata('Type', Types_1.Types.Node, target.prototype);
        typeDefinition(target, meta);
    };
}
exports.Node = Node;
function Inject(service) {
    return function (target, propertyKey) {
        var injects = Reflect.getMetadata('Injects', target);
        if (!injects) {
            injects = new Array();
            Reflect.defineMetadata('Injects', injects, target);
        }
        injects.push({
            propertyKey: propertyKey,
            service: service
        });
    };
}
exports.Inject = Inject;
function Input(target, propertyKey) {
    var inputs = Reflect.getMetadata('Inputs', target);
    if (!inputs) {
        inputs = new Array();
        Reflect.defineMetadata('Inputs', inputs, target);
    }
    inputs.push(propertyKey);
}
exports.Input = Input;
function Output(target, propertyKey) {
    var outputs = Reflect.getMetadata('Outputs', target);
    if (!outputs) {
        outputs = new Array();
        Reflect.defineMetadata('Outputs', outputs, target);
    }
    outputs.push(propertyKey);
}
exports.Output = Output;
function Param(meta) {
    return function (target, propertyKey) {
        var params = Reflect.getMetadata('Params', target);
        if (!params) {
            params = new Array();
            Reflect.defineMetadata('Params', params, target);
        }
        meta = meta || {};
        if (typeof meta.optional === 'undefined') {
            meta.optional = true;
        }
        if (typeof meta.fragmentDependant === 'undefined') {
            meta.fragmentDependant = false;
        }
        params.push({
            name: propertyKey,
            type: Reflect.getMetadata('design:type', target, propertyKey).name,
            meta: meta
        });
    };
}
exports.Param = Param;
