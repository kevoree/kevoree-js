import { EventEmitter } from 'events';
import { kevoree, modeling, KevoreeModel } from 'kevoree-model';
import { Logger, LoggerFactory } from 'kevoree-logger';
import { Callback } from 'kevoree-api';
import { Injector } from 'ts-injector';

import { DeployCallback } from './DeployCallback';
import { WebSocketClientPlugin } from './WebSocketClientPlugin';

export class Core extends EventEmitter {

  private nodeName: string;
  private url: string;
  private logger: Logger;
  private isStarted: boolean;
  private emitter: EventEmitter;

  private nodeInstance: Object;
  private kModel: KevoreeModel;
  private currentModel: kevoree.Model;
  private deployingModel: kevoree.Model;
  private isDeploying: boolean;

  constructor(nodeName: string, url: string) {
    super();
    this.nodeName = nodeName;
    this.url = url;
    this.logger = LoggerFactory.createLogger(nodeName);
    this.isStarted = false;
    this.emitter = new EventEmitter();
  }

  start(cb: Callback) {
    this.logger.info(`starting ${this.nodeName} using ${this.url} ...`);
    const wsPlugin = new WebSocketClientPlugin(`ws://${this.url}`);
    this.kModel = new KevoreeModel(modeling.memory.manager.DataManagerBuilder.create().withContentDeliveryDriver(wsPlugin).build());
    this.kModel.connect(ignore => {
      this.isStarted = true;
      cb();
    });
  }

  stop(cb: Callback) {
    this.logger.info(`stopping ${this.nodeName} using ${this.url} ...`);
    if (this.isStarted && this.kModel) {
      this.kModel.disconnect(ignore => {
        cb();
      });
    } else {
      cb();
    }
  }

  getNodeName(): string {
    return this.nodeName;
  }

  getUrl(): string {
    return this.url;
  }
}
