import { Injector, Context } from 'ts-injector';
import { ModelServiceImpl } from './ModelServiceImpl';
import { Logger } from 'kevoree-logger';
import JavascriptNode = require('../main/JavascriptNode');

// create an injector
var di = new Injector();
var ctx = new Context();
var modelService = new ModelServiceImpl('node0', 'node0', 'nodes[node0]', {});
var loggerService = new Logger((<any> JavascriptNode).name);

ctx.register('ModelService', modelService);
ctx.register('LoggerService', loggerService);

// create a node instance
var node = new JavascriptNode();

// inject services in instance
di.inject(node, ctx);

// start instance
node.start((err) => {
  if (err) {
    console.log('Unable to start node');
  } else {
    console.log(node['modelService']);
  }
});
