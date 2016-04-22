import * as React from 'react';
import { Component, Input, Inject, Services, ContextService } from 'kevoree-api';
import { Observer, ComponentUI, UIProp } from 'kevoree-ui';
import { ConsolePrinterUI } from './ConsolePrinterUI';

@Component({
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
})
@ComponentUI(ConsolePrinterUI)
class ConsolePrinter {

  @UIProp()
  private onMessage: Observer<string>;

  @Inject(Services.Context)
  private context: ContextService;

  @Input({ type: 'string' })
  input(msg: string): void {
    console.log(`${this.context.getInstanceName()}> ${msg}`);
    this.onMessage.dispatch(msg);
  }
}

export = ConsolePrinter;
