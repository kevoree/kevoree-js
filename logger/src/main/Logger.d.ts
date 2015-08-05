declare module "kevoree-logger" {
  export interface Logger {
    info(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
  }

  export class Logger implements Logger {
    private tag;
    constructor(tag?: string);
  }
}
