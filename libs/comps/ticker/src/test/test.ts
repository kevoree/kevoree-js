import { Injectables } from 'kevoree-api';
import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import Ticker = require('../main/Ticker');

// create an injector
var di = new Injector();
var modelService = new ModelServiceImpl();
di.register(Injectables.ModelService, modelService);

// contextual injector for the node
var ctx = new Context();
ctx.register(Injectables.LoggerService, LoggerFactory.createLogger('comp'));
ctx.register(Injectables.ContextService, new ContextServiceImpl('comp', 'node0'));

// create a node instance
var comp = new Ticker();
comp['delay'] = 500;
comp['random'] = true;
comp['tick'] = new OutputPortImpl();

// inject services in instance
di.inject(comp, ctx);

// start instance
comp.start();

setTimeout(() => {
    comp['delay'] = 1000;
    comp['random'] = false;
    comp.update();
}, 2000);

setTimeout(() => {
    comp.stop();
}, 5000);
