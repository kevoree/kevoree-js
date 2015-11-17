import { Node, Start, Stop, Injectables, Param, DataType } from 'kevoree-api';
import { Inject } from 'ts-injector';
import { Logger } from 'kevoree-logger';

@Node({ desc: '<strong>TODO</strong> JavascriptNode description' })
class JavascriptNode {

    @Inject(Injectables.LoggerService)
    private logger: Logger;

    @Param({ datatype: DataType.LIST })
    private logLevel: string;

    @Start()
    start(): void {

    }

    @Stop()
    stop(): void {
        this.logger.info('Node stopped');
    }
}

export = JavascriptNode;
