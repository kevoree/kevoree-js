/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import { MetaData, ParamData, Injectables } from 'kevoree-api';
import { Injector, Context } from 'ts-injector';
import { LoggerFactory } from 'kevoree-logger';
require('reflect-metadata');
import Ticker = require('../main/Ticker');

var t = new Ticker();

Reflect.getMetadata(MetaData.OUTPUTS, Ticker.prototype).forEach((name: string) => {
  t[name] = {
    send(msg: string, cb?: Callback): void {
      console.log(`need to send ${msg}`);
    }
  };
});

var injector = new Injector();
var context = new Context();
var logger = LoggerFactory.createLogger('TypeDefinition', 'tdef');
logger.debug('lorem ipsum');
logger.info('dolor sit');
logger.warn('amet consectetur');
logger.error('adipiscing elit');
context.register(Injectables.LoggerService, LoggerFactory.createLogger((<any> Ticker).name, 'ticker'));
context.register(Injectables.ModelService, {
  getName:     function () { return 'ticker'; },
  getNodeName: function () { return 'node0';  }
});
injector.inject(t, context);

var noop = () => { };

Reflect.getMetadata(MetaData.PARAMS, Ticker.prototype).forEach((param: ParamData) => {
  t[param.name] = param.meta.defaultValue;
});
t.start(noop);

setTimeout(() => {
  console.log('adapting...');
  t['delay'] = 500;
  t['random'] = true;
  t.update(noop);
  console.log('adapted');
}, 5000);
