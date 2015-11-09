var ts_injector_1 = require('ts-injector');
var ModelServiceImpl_1 = require('./ModelServiceImpl');
var kevoree_logger_1 = require('kevoree-logger');
var JavascriptNode = require('../main/JavascriptNode');
var di = new ts_injector_1.Injector();
var ctx = new ts_injector_1.Context();
var modelService = new ModelServiceImpl_1.ModelServiceImpl();
var loggerService = kevoree_logger_1.LoggerFactory.createLogger('JavascriptNode', 'node0');
ctx.register(ModelServiceImpl_1.ModelServiceImpl, modelService);
ctx.register(kevoree_logger_1.LoggerImpl, loggerService);
var node = new JavascriptNode();
di.inject(node, ctx);
node.start();
setTimeout(function () {
    node.stop();
}, 2000);
