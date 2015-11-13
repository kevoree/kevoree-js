import { Injectables } from 'kevoree-api';
import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import ConsolePrinter = require('../main/ConsolePrinter');

// create an injector
var di = new Injector();
var modelService = new ModelServiceImpl();
di.register(Injectables.ModelService, modelService);

// contextual injector for the node
var ctx = new Context();
ctx.register(Injectables.LoggerService, LoggerFactory.createLogger('ConsolePrinter', 'comp'));
ctx.register(Injectables.ContextService, new ContextServiceImpl('comp', 'node0'));

// create a node instance
var comp = new ConsolePrinter();

// inject services in instance
di.inject(comp, ctx);

var interval = setInterval(() => {
    // fake incoming messages
    comp.input(new Date().getTime() + '');
}, 500);

setTimeout(() => {
    clearInterval(interval);
}, 2000);
