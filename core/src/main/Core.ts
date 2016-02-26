import { EventEmitter } from 'events';
import { org } from 'kevoree-model';
import { Logger, LoggerFactory } from 'kevoree-logger';
import { Callback } from 'kevoree-api';
import { DeployCallback } from './DeployCallback';

var NAME_PATTERN = /^[\w-]+$/;

export class Core extends EventEmitter {

    private logger: Logger;
    private nodeName: string;
    private nodeInstance: Object;
    private currentModel: org.kevoree.Model;
    private deployingModel: org.kevoree.Model;
    private emitter: EventEmitter;
    private isDeploying: boolean;
    private isStarted: boolean;

    constructor() {
        super();
        this.logger = LoggerFactory.createLogger((<any> Core).name, 'core');
        this.isStarted = false;
        this.emitter = new EventEmitter();
    }

    start(nodeName: string, url: string, cb: Callback): void {
        
    }
}
