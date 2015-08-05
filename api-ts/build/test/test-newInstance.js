var kevoree_logger_1 = require('kevoree-logger');
var ModelServiceImpl_1 = require('./ModelServiceImpl');
var MyComp_1 = require('./MyComp');
var MyOtherComp_1 = require('./MyOtherComp');
var api_1 = require('../main/api');
var c1 = new MyComp_1.MyComp(), c2 = new MyOtherComp_1.MyOtherComp(), name1 = 'comp0', name2 = 'comp1';
var loggers = {};
init('node0', c1, name1);
init('node0', c2, name2);
function init(nodeName, instance, name) {
    var injects = Reflect.getMetadata('Injects', instance.constructor) || [];
    injects.forEach(function (item) {
        switch (item.service) {
            case api_1.Services.ModelService:
                Object.defineProperty(instance.constructor.prototype, item.propertyKey, {
                    value: new ModelServiceImpl_1.ModelServiceImpl(nodeName, name, {}, null)
                });
                console.info("ModelService injected in " + name);
                break;
            case api_1.Services.LoggerService:
                loggers[instance.constructor.name] = loggers[instance.constructor.name] || new kevoree_logger_1.Logger(instance.constructor.name);
                Object.defineProperty(instance.constructor.prototype, item.propertyKey, {
                    value: loggers[instance.constructor.name]
                });
                console.info("LoggerService injected in " + name);
                break;
        }
    });
    if (typeof instance.start === 'function') {
        instance.start(function (err) {
            if (err) {
                console.log('error', name);
            }
            else {
                console.log('ok', name);
            }
        });
    }
    else {
        console.log('no start() for', name);
    }
}
