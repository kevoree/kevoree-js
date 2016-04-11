import { Component, Input, Inject, Services, ContextService } from 'kevoree-api';
import { Observer, ComponentUI, UIProp } from 'kevoree-ui';
import * as React from 'react';
import { ConsolePrinterUI, UIProps } from './ConsolePrinterUI';

@Component({
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
})
@ComponentUI(ConsolePrinterUI)
class ConsolePrinter {

  @UIProp
  private onMessage = new Observer<string>();

  @Inject(Services.Context)
  private ctx: ContextService;

  @Input({ type: 'string' })
  input(msg: string): void {
    console.log(`${this.ctx.getInstanceName()}> ${msg}`);
    this.onMessage.dispatch(msg);
  }
}

export = ConsolePrinter;
