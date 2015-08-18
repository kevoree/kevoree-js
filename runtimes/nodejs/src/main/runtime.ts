import { LoggerImpl } from 'kevoree-logger';
import { Injector } from 'ts-injector';
import { Core } from 'kevoree-core';

export class Runtime {

  private injector: Injector;
  private logger: Logger;
  private core: Core;

  constructor(logger: Logger) {
    if (!logger) {
      throw new Error('You must give a logger instance to the runtime');
    }
    this.injector = new Injector();
    this.logger = logger;

    this.injector.register('Logger', this.logger);

    this.core = new Core();
    this.injector.inject(this.core);
  }

  start(name: string, cb: Callback): void {
    this.core.start(name, cb);
  }
}
