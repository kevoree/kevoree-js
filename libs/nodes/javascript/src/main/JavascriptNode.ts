import { Node, OnStart, OnStop, Inject, Services, Param, LoggerService } from 'kevoree-api';
import { LogLevel } from './LogLevel';

@Node({
  version: 1,
  description: '<strong>TODO</strong> JavascriptNode description'
})
class JavascriptNode {

    @Inject(Services.Logger)
    private logger: LoggerService;

    @Param
    private logLevel: LogLevel = LogLevel.INFO;

    @OnStart()
    start(): void {
        this.logger.info('Node started');
    }

    @OnStop()
    stop(): void {
        this.logger.info('Node stopped');
    }
}

export = JavascriptNode;
