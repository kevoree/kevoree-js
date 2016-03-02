import { Node, Start, Stop, Inject, Services, Param } from 'kevoree-api';
import { Logger } from 'kevoree-logger';
import { LogLevel } from './LogLevel';

@Node({
  version: 1,
  description: '<strong>TODO</strong> JavascriptNode description'
})
class JavascriptNode {

    @Inject(Services.Logger)
    private logger: Logger;

    @Param
    private logLevel: LogLevel = LogLevel.INFO;

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
