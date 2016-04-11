import { Component, Input, Inject, Services, ContextService, Observer } from 'kevoree-api';
import * as React from 'react';
import { ConsolePrinterUI, UIProps } from './ConsolePrinterUI';

@Component({
  version: 1,
  description: 'Prints out incoming messages to the terminal console'
})
class ConsolePrinter {

  private onMessage: Observer<string>;

  @Inject(Services.Context)
  private ctx: ContextService;

  constructor() {
    this.onMessage = new Observer<string>();
  }

  @Input({ type: 'string' })
  input(msg: string): void {
    console.log(`${this.ctx.getInstanceName()}> ${msg}`);
    this.onMessage.dispatch(msg);
  }

  render(): React.ReactElement<any> {
    return <ConsolePrinterUI onMessage={this.onMessage} />;
  }
}

export = ConsolePrinter;
