import * as Assert from 'assert';
import { LoggerFactory, LogLevel } from 'kevoree-logger';
import { Injector, Context } from 'ts-injector';
import { kevoree } from 'kevoree-model';

import { Core } from '../main/Core';

describe('Core', () => {
  const name = 'node0';
  const url = 'localhost:9000';
  const core = new Core(name, url);

  it('should be started with name "node0"', (done) => {
    core.start(e => {
      if (e) {
        done(e);
      } else {
        Assert.equal(core.getNodeName(), name, 'should be equal');
        done();
      }
    });
  });

  it('should stop the core', (done) => {
      core.stop(done);
  });
});
