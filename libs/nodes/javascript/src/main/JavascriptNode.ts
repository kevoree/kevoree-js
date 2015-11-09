import { ModelService, Node, Start, Stop } from 'kevoree-api';
import { Inject } from 'ts-injector';
import { Logger, LoggerImpl } from 'kevoree-logger';

@Node({ desc: '<strong>TODO</strong> JavascriptNode description' })
class JavascriptNode {

    @Inject(LoggerImpl)
    private logger: Logger;

    @Inject(null)
    private modelService: ModelService;

    @Start()
    start(): void {
        this.logger.info('Node started');

    }

    @Stop()
    stop(): void {
        this.logger.info('Node stopped');
    }
}

export = JavascriptNode;
