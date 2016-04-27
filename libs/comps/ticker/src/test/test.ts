import { Services } from 'kevoree-api';
import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import { LoggerImpl, LoggerFactory } from 'kevoree-logger';
import Ticker = require('../main/Ticker');

describe('Ticker', function () {
  this.timeout(6000);

  it('', done => {
    // create an injector
    var di = new Injector();
    var modelService = new ModelServiceImpl();
    di.register(Services.Model, modelService);

    const nodeName = 'node0';
    const compName = 'comp';

    // contextual injector for the node
    var ctx = new Context();
    ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
    ctx.register(Services.Context, new ContextServiceImpl(compName, nodeName));

    // create an instance
    var comp = new Ticker();
    comp['delay'] = 500;
    comp['random'] = true;
    comp['tick'] = new OutputPortImpl(`${nodeName}:${compName}->tick`);

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
        done();
    }, 5000);
  });
});
