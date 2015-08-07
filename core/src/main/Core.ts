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
  private isDeploying: boolean;
  private isStarted: boolean;

  constructor(logger: Logger) {
    super();
    this.logger = logger;
    this.isStarted = true;
    this.emitter = new EventEmitter();
    this.pendingModels = [];
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

      var id = setInterval(() => {
        if (this.isStarted) {
          if (!this.isDeploying) {
            // no deployment in progress
            var item = this.pendingModels.shift();
            if (item) {
              // there is a model in the pending queue
              this.doDeploy(item);
            }
          }
        } else {
          // stop has been requested
          if (!this.isDeploying) {
            // no deployment in progress: do stop
            this.emitter.emit('stop');
          }
        }
      });

      this.emitter.once('stop', () => {
        // clear main loop
        clearInterval(id);
        this.logger.info('Core', `Platform stopped: ${this.nodeName}`);

        // notify deployers if any
        this.pendingModels.forEach((item: Item) => {
          item.callback(new Error('Core is stopped'), false);
        });

        // emit stop event
        this.emit('stop');
      });

      this.logger.info('Core', `Platform started: ${this.nodeName}`);

    } else {
      throw new Error(`node name must match: ${NAME_PATTERN.toString()} (given: "${name}")`);
    }
  }

  stop(): void {
    this.isStarted = false;
    if (this.isDeploying) {
      this.logger.info('Core', 'Core stop requested, waiting for current deploy to finish...');
    } else {
      this.logger.info('Core', 'Core stop requested...');
    }
  }

  deploy(model: kevoree.ContainerRoot, done: DeployCallback): void {
    var item = { model: model, callback: done }
    this.pendingModels.push(item)
  }

  private doDeploy(item: Item): void {
    // lock deploy
    this.isDeploying = true;
    // TODO clone model

    // TODO put it in read-only mode
    // TODO diff with current
    // TODO give diff to node to get adaptations commands
    // TODO process commands
    // TODO if error: rollback by calling undo() on each already made commands
    // TODO if success: put model in read-write mode
    // TODO set cloned model as current model
    setTimeout(() => {
      // unlock deploy
      this.isDeploying = false;
      // callback the model deployer
      item.callback(null, true);
    }, 2000);
  }
}


class Item {
  model: kevoree.ContainerRoot;
  callback: DeployCallback;
}
