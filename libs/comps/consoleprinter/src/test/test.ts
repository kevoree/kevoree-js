import { Services, Injector, Context } from 'kevoree-api';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import ConsolePrinter = require('../main/ConsolePrinter');

describe('', function () {
  this.timeout(5000);

  it('', (done: MochaDone) => {
    // create an injector
    var di = new Injector();
    var modelService = new ModelServiceImpl();
    di.register(Services.Model, modelService);

    // contextual injector for the node
    var ctx = new Context();
    ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
    ctx.register(Services.Context, new ContextServiceImpl('comp', 'node0'));

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
        done();
    }, 2000);
  });
});
