import { Component, Input, Inject, Services, ContextService } from 'kevoree-api';
import React = require('react');

@Component({
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
})
class ConsolePrinter {

    @Inject(Services.Context)
    private context: ContextService;

    @Input({ type: 'string' })
    input(msg: string): void {
        console.log(`${this.context.getInstanceName()}> ${msg}`);
    }
}

export = ConsolePrinter;
