import * as Assert from 'assert';
import { LoggerFactory, LogLevel } from 'kevoree-logger';
import { Injector, Context }    from 'ts-injector';
import { Core }       from '../main/Core';
import { org }        from 'kevoree-model';

describe('Core', () => {
  var injector = new Injector();
  var logger = LoggerFactory.createLogger((<any> Core).name, 'core');
  logger.setLevel(LogLevel.QUIET);
  var ctx = new Context();
  ctx.register({ name: 'LoggerService' }, logger);
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

  it('should stop the core', (done) => {
      core.stop(done);
  });

  it('should not start with a wrong name "a b"', (done) => {
      core.start('a b', (e) => {
          Assert.notEqual(e, null);
          done();
      });
  });
});
