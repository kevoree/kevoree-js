type T = string | number | boolean;

declare module 'kevoree-entities' {
  export interface Callback {
    (err?: Error): void;
  }
  export interface Logger {
    info(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    setLevel(level: string|number): void;
    setFilter(tag: string): void;
  }
  export interface Core {
    submitScript(script: string): void;
    submitScript(script: string, callback: (err: Error, model: any) => void): void;
  }
  export interface Dictionary {
    get<T>(name: string, defaultValue?: T): T;
    getString(name: string, defaultValue?: string): string;
    getNumber(name: string, defaultValue?: number): number;
    getBoolean(name: string, defaultValue?: boolean): boolean;
  }
  export interface DictionaryParam {
    optional?: boolean;
    defaultValue?: string|number|boolean;
    fragmentDependant?: boolean;
    datatype?: DataType | string;
  }
  export interface Channel {
    onSend(fromPortPath: string, destPortPaths: string[], msg: string, callback: () => void): void;
  }

  export abstract class KevoreeEntity {
    static tdef_version: number;

    log: Logger;
    kCore: Core;
    nodeName: string;
    name: string;
    path: string;
    started: boolean;
    dictionary: Dictionary;

    getKevoreeCore(): Core;
    getNodeName(): string;
    getPath(): string;
    getName(): string;
    getModelEntity(): any;
    isStarted(): boolean;

    start(done: Callback): void;
    stop(done: Callback): void;
    update(done: Callback): void;

    toString(): string;
  }

  export abstract class AbstractComponent extends KevoreeEntity {}
  export abstract class AbstractNode extends KevoreeEntity {
    processTraces(diffSeq: any, targetModel: any): Array<any>;
  }
  export abstract class AbstractChannel extends KevoreeEntity {
    protected localDispatch(msg: string, callback?: (answer: string) => void): void;
		protected getOutputs(): Array<string>;
		protected getInputs(): Array<string>;
		protected getInputPorts(): Array<Port>;
		protected getLocalInputPorts(): Array<Port>;
		protected getRemoteInputPorts(): Array<Port>;
  }
  export abstract class AbstractGroup extends KevoreeEntity {
    updateModel(model: any): void;
  }

  export interface Port {
		path: string;
		isRemote: boolean;
    send(msg: string, callback?: Callback): void;
  }

  export enum DataType {
    STRING, DOUBLE, LONG, INT, FLOAT, SHORT, BOOLEAN
  }
}
