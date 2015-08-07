import { Logger }       from 'kevoree-logger'
import { ModelServiceImpl } from './ModelServiceImpl'
import { MyComp }       from './MyComp'
import { MyOtherComp }  from './MyOtherComp'
import { Injector, Context } from 'ts-injector';

var c1: any = new MyComp(),
    c2: any = new MyOtherComp(),
    name1 = 'comp0',
    name2 = 'comp1'

var loggers = {}

var injector = new Injector();

var ctx1 = new Context(),
    ctx2 = new Context();

ctx1.register('LoggerService', new Logger('MyComp'));
ctx1.register('ModelService', new ModelServiceImpl('node0', 'comp1', {}, null));
injector.inject(c1, ctx1);

ctx2.register('LoggerService', new Logger('MyOtherComp'));
ctx2.register('ModelService', new ModelServiceImpl('node0', 'comp2', {}, null));
injector.inject(c2, ctx2);

if (typeof c1.start === 'function') {
  c1.start((err?: Error) => {
    if (err) {
      throw err;
    } else {
      console.log('c1 started');
    }
  });
}

if (typeof c2.start === 'function') {
  c2.start((err?: Error) => {
    if (err) {
      throw err;
    } else {
      console.log('c2 started');
    }
  });
} else {
  console.log('c2.start() === undefined   ==> start anyway without any process on start');
}
