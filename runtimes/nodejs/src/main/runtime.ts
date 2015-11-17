import { Logger, LoggerFactory } from 'kevoree-logger';
import { Core } from 'kevoree-core';

export class Runtime {

    private logger: Logger;
    private core: Core;

    constructor() {
        this.logger = LoggerFactory.createLogger((<any> Runtime).name, "runtime");
        this.core = new Core();
    }

    start(nodeName: string, cb: Callback): void {
        this.core.start(nodeName, cb);
    }

    stop(cb: Callback): void {
        this.core.stop(cb);
    }
}

export interface Callback {
    (e?: Error): void;
}
