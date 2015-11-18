import { Node, Start, Stop, Injectables, ChoiceParam } from 'kevoree-api';
import { Inject } from 'ts-injector';
import { Logger } from 'kevoree-logger';

@Node({ description: '<strong>TODO</strong> JavascriptNode description' })
class JavascriptNode {

    @Inject(Injectables.LoggerService)
    private logger: Logger;

    @ChoiceParam({
        choices: ['DEBUG', 'INFO', 'WARN', 'ERROR', 'QUIET'],
        defaultIndex: 1
    })
    private logLevel: string;

    @Start()
    start(): void {}

    @Stop()
    stop(): void {
        this.logger.info('Node stopped');
    }
}

export = JavascriptNode;
