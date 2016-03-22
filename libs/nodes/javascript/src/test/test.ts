import { Services, LoggerImpl, LoggerFactory } from 'kevoree-api';
import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
// import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import JavascriptNode = require('../main/JavascriptNode');

// create an injector
var di = new Injector();
var modelService = new ModelServiceImpl();
di.register(Services.Model, modelService);

// contextual injector for the node
var ctx = new Context();
ctx.register(Services.Logger, LoggerFactory.createLogger('node0'));
ctx.register(Services.Context, new ContextServiceImpl('node0', 'node0'));

// create a node instance
var node = new JavascriptNode();

// inject services in instance
di.inject(node, ctx);

// start instance
node.start();

setTimeout(() => {
    node.stop();
}, 2000);
