interface Callback {
  (err?: Error): void
}

interface DeployCallback {
  (err: Error, update: boolean): void
}

declare module 'kevoree-core' {
  import { EventEmitter } from 'events';
  import { org } from 'kevoree-model';

  export class Core extends EventEmitter {
    start(name: string, cb: Callback): void;
    stop(): void;
    deploy(model: org.kevoree.Model, cb: DeployCallback): void;  }
}
