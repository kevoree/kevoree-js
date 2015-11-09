import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import JavascriptNode = require('../main/JavascriptNode');

// create an injector
var di = new Injector();
var ctx = new Context();
var modelService = new ModelServiceImpl();
var loggerService = LoggerFactory.createLogger('JavascriptNode', 'node0');

ctx.register(ModelServiceImpl, modelService);
ctx.register(LoggerImpl, loggerService);

// create a node instance
var node = new JavascriptNode();

// inject services in instance
di.inject(node, ctx);

// start instance
node.start();

setTimeout(() => {
    node.stop();
}, 2000);
