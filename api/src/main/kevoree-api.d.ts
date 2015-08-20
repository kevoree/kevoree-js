declare interface ModelService {
  getName(): string;
  getPath(): string;
  getNodeName(): string;
  getCurrentModel(): Object;
  getDeployingModel(): Object;
  getModelInstance(): Object;
  deploy(model: any, done: Callback): void;
}

declare interface OutputPort {
  send(msg: string): void;
  send(msg: string, cb: Callback): void;
}

declare interface Callback {
  (err?: Error): void;
}

declare module 'kevoree-api' {
  export function Channel(meta?: TypeMeta): (target: any) => void;
  export function Component(meta?: TypeMeta): (target: any) => void;
  export function Group(meta?: TypeMeta): (target: any) => void;
  export function Node(meta?: TypeMeta): (target: any) => void;
  export function Input(schema?: Object): (target: any, propertyKey: string) => void;
  export function Output(schema?: Object): (target: any, propertyKey: string) => void;
  export function Param(meta?: ParamMeta): (target: any, propertyKey: string) => void;

  export class MetaData {
    static TYPE: string;
    static META: string;
    static NAME: string;
    static PARAMS: string;
    static INPUTS: string;
    static OUTPUTS: string;
    static MSG_SCHEMA: string;
  }

  export interface ParamMeta {
    optional?: boolean
    fragmentDependant?: boolean
    defaultValue?: number | string | boolean
  }

  export interface ParamData {
    name: string
    type: string
    meta: ParamMeta
  }

  export interface TypeMeta {
    desc?: string
  }

  export enum Types {
    Node,
    Group,
    Channel,
    Component
  }
}
