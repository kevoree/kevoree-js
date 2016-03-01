import { Component, Input, Injectables, ContextService } from 'kevoree-api';
import { Inject } from 'ts-injector';

@Component({
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
})
class ConsolePrinter {

    @Inject(Injectables.ContextService)
    private context: ContextService;

    @Input({ type: 'string' })
    input(msg: string): void {
        msg = msg + ''; // forces string
        console.log(`${this.context.getInstanceName()}> ${msg}`);
    }
}

export = ConsolePrinter;
