import * as Assert from 'assert';
import { LoggerFactory, LoggerImpl, LogLevel } from 'kevoree-logger';
import { Injector, Context }    from 'ts-injector';
import { Core }       from '../main/kevoree-core';
import { org }        from 'kevoree-model';

describe('Core', () => {
  var injector = new Injector();
  var logger = LoggerFactory.createLogger((<any> Core).name, 'core');
  logger.setLevel(LogLevel.QUIET);
  var ctx = new Context();
  ctx.register(LoggerImpl, logger);
  var core = new Core();
  injector.inject(core, ctx);

  it('should be started with name "node0"', (done) => {
    core.start('node0', (e) => {
      if (e) {
        done(e);
      } else {
        Assert.equal(core['nodeName'], 'node0', 'should be equal');
        done();
      }
    });
  });
});
