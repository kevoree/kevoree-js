import {
  Node
} from 'kevoree-api';
import { Inject } from 'ts-injector';

@Node({ desc: 'JavaScript platform node' })
class JavascriptNode {

  @Inject('Logger')
  private log: Logger;

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
