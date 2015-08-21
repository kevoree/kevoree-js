import { EventEmitter } from 'events';
import { Inject } from 'ts-injector';
import { org } from 'kevoree-model';

var NAME_PATTERN = /^[\w-]+$/;

export class Core extends EventEmitter {
  @Inject('Logger')
  private logger: Logger;

  private nodeName: string;
  private nodeInstance: Object;
  private pendingModels: Array<Item>;
  private currentModel: org.kevoree.Model;
  private deployingModel: org.kevoree.Model;
  private emitter: EventEmitter;
  private isDeploying: boolean;
  private isStarted: boolean;

  constructor() {
    super();
    this.isStarted = false;
    this.emitter = new EventEmitter();
    this.pendingModels = [];
  }

  start(name: string, cb: Callback): void {
    if (!this.isStarted) {
      if (!name || name.length === 0) {
        name = 'node0';
      }

      if (name.match(NAME_PATTERN)) {
        this.nodeName = name;

        var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
        var kModel = new org.KevoreeModel(dm);
        var kView = kModel.universe(0).time(0);

        kModel.connect((e) => {
          if (e) {
            cb(e);
          } else {
            this.currentModel = kView.createModel();
            kView.setRoot(this.currentModel, (e: any) => {
              if (e) {
                cb(e);
              } else {
                var node = kView.createNode();
                node.setName(this.nodeName);
                node.setStarted(false);
                this.currentModel.addNodes(node);

                this.isStarted = true;
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
                  this.logger.info(`Platform stopped: ${this.nodeName}`);

                  // notify deployers if any
                  this.pendingModels.forEach((item: Item) => {
                    item.callback(new Error('Core is stopped'), false);
                  });

                  // emit stop event
                  this.emit('stop');
                });

                this.logger.info(`Platform started: ${this.nodeName}`);
                cb();
              }
            });
          }
        });

      } else {
        cb(new Error(`node name must match: ${NAME_PATTERN.toString()} (given: "${name}")`));
      }
    } else {
      this.logger.warn('Core is already started');
    }
  }

  stop(): void {
    this.isStarted = false;
    if (this.isDeploying) {
      this.logger.info('Core stop requested, waiting for current deploy to finish...');
    } else {
      this.logger.info('Core stop requested...');
    }
  }

  deploy(model: org.kevoree.Model, cb: DeployCallback): void {
    var item = { model: model, callback: cb }
    this.pendingModels.push(item)
  }

  private doDeploy(item: Item): void {
    // lock deploy
    this.isDeploying = true;
    // TODO clone model'Core'

    // TODO put it in read-only mode
    // TODO diff with current
    // TODO give diff to node to get adaptations commands
    // TODO process commands
    // TODO if error: rollback by calling undo() on each already made commands
    // TODO if success: put model in read-write mode
    // TODO set cloned model as current model
    setTimeout(() => {
      // faking time comsuming adaptations with setTimeout
      // unlock deploy
      this.isDeploying = false;
      // callback the model deployer
      item.callback(null, true);
    }, 2000);
  }
}

export interface Callback {
  (err?: Error): void;
}

export interface DeployCallback {
  (err: Error, update: boolean): void;
}

class Item {
  model: any;
  callback: DeployCallback;
}
