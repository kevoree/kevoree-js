import { OutputPort } from 'kevoree-api';

export class OutputPortImpl implements OutputPort {

  constructor(public path: string) {}

  send(msg: string): void {
    console.log(`>>> ${msg}`);
  }
}
