/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
import { MetaData, ParamData } from 'kevoree-api';
import { Injector } from 'ts-injector';
require('reflect-metadata');
import Ticker = require('../main/Ticker');

var t = new Ticker();

Reflect.getMetadata(MetaData.OUTPUTS, Ticker.prototype)
  .forEach((name: string) => {
  t[name] = {
    send(msg: string, cb?: Callback): void {
      console.log(`need to send ${msg}`);
    }
  };
});

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
