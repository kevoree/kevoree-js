import { EventEmitter } from 'events'
import { Logger } from 'kevoree-logger'
import * as kevoree from 'kevoree-library'

var NAME_PATTERN = /^[\w-]+$/;

export class Core extends EventEmitter implements Core {
  private logger: Logger;
  private nodeName: string;
  private nodeInstance: Object;
  private pendingModels: Array<Item>;
  private currentModel: kevoree.ContainerRoot;
  private deployingModel: kevoree.ContainerRoot;
  private emitter: EventEmitter;

  constructor(logger: Logger) {
    super();
    this.logger = logger;
    this.emitter = new EventEmitter();
    this.pendingModels = new Array<Item>();
  }

  start(name: string): void {
    if (!name || name.length === 0) {
      name = 'node0';
    }

    if (name.match(NAME_PATTERN)) {
      this.nodeName = name;
      var factory = new kevoree.factory.DefaultKevoreeFactory();
      this.currentModel = factory.createContainerRoot();
      factory.root(this.currentModel);

      var node = factory.createContainerNode();
      node.name = this.nodeName;
      node.started = false;

      this.currentModel.addNodes(node);

      this.emitter.on('newModel', (item: Item) => {
        if (!this.isDeploying) {

        }
      })

      this.emitter.on('stopped', () => {
        //clearInterval(id);
        this.emit('stopped');
      });

    } else {
      throw new Error(`node name must match: ${NAME_PATTERN.toString()} (given: "${name}")`);
    }
  }

  stop(done: Callback): void {

  }

  deploy(model: kevoree.ContainerRoot, done: Callback): void {
    var item = { model: model, callback: done }
    this.pendingModels.push(item)
    this.emitter.emit('newModel', item)
  }

  private doDeploy(item: Item) {
    // clone model
    // put it in read-only mode
    // diff with current
    // give diff to node to get adaptations commands
    // process commands
    // if error: rollback by calling undo() on each already made commands
    // if success: put model in read-write mode
    // set cloned model as current model
    item.callback()
  }
}

class Item {
  model: kevoree.ContainerRoot;
  callback: Callback;
}
