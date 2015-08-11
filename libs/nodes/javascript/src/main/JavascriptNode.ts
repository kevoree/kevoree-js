import {
  Node, ModelService, LoggerService
} from 'kevoree-api';
import { Inject } from 'ts-injector';

@Node({ desc: 'JavaScript platform node' })
class JavascriptNode {

  @Inject('LoggerService')
  private log: LoggerService;

  @Inject('ModelService')
  private modelService: ModelService;

  start(done: Callback): void {
    this.log.info(`Node "${this.modelService.getName()}" started`);
    done();
  }

  stop(done: Callback): void {
    this.log.info(`Node "${this.modelService.getName()}" stopped`);
    done();
  }
}

export = JavascriptNode;
