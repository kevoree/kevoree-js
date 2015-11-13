import { Node, Start, Stop, Injectables, ModelService, ContextService } from 'kevoree-api';
import { Inject } from 'ts-injector';
import { Logger } from 'kevoree-logger';

@Node({ desc: '<strong>TODO</strong> JavascriptNode description' })
class JavascriptNode {

    @Inject(Injectables.LoggerService)
    private logger: Logger;

    @Inject(Injectables.ModelService)
    private modelService: ModelService;

    @Inject(Injectables.ContextService)
    private context: ContextService;

    @Start()
    start(): void {
        this.logger.info('Node started');
        this.modelService.submitScript(`add ${this.context.getInstanceName()}.ticker: Ticker`);
    }

    @Stop()
    stop(): void {
        this.logger.info('Node stopped');
    }
}

export = JavascriptNode;
