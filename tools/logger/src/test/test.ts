/// <reference path="../../src/decl/kevoree-logger.d.ts"/>

import { LoggerFactory, LogLevel, Logger } from '../main/kevoree-logger';

var log = LoggerFactory.createLogger('MyTag', 'log');
var log2 = LoggerFactory.createLogger('AnotherTag', 'log1');
var log3 = LoggerFactory.createLogger('SomethingReallyLong', 'log2');
LoggerFactory.setLevel(LogLevel.DEBUG);

function print(log: Logger) {
  // log.debug('lorem ipsum');
  // log.info('dolor sit');
  // log.warn('amet consectetur');
  // log.error('adipiscing elit');
  // console.log('=============');
  log.debug('lorem', 'ipsum');
  log.info('dolor sit');
  log.warn('amet','consec\ntetur');
  log.error((<any> new Error('Something')).stack);
}

print(log);
print(log2);
print(log3);
