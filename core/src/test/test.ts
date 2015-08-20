/// <reference path="../../typings/mocha/mocha.d.ts" />

import * as Assert from 'assert';
import { LoggerImpl, LogLevel } from 'kevoree-logger';
import { Injector }   from 'ts-injector';
import { Core }       from '../main/Core';
import { org }        from 'kevoree-model'

describe('Core', () => {
  var injector = new Injector();
  var logger = new LoggerImpl('Runtime');
  logger.setLevel(LogLevel.QUIET);
  injector.register('Logger', logger);

  var core = new Core();
  injector.inject(core);

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
