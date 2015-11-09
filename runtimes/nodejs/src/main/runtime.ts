import { Logger } from 'kevoree-logger';
import { Injector } from 'ts-injector';
import { Core } from 'kevoree-core';

export class Runtime {

  private injector: Injector;
  private logger: Logger;
  private core: Core;

  constructor() {
    this.injector = new Injector();

    this.injector.register(LoggerImpl, this.logger);

    this.core = new Core();
    this.injector.inject(this.core);
  }

  start(name: string, cb: Callback): void {
    this.core.start(name, cb);
  }
}
