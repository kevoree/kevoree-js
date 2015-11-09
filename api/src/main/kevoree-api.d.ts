declare module 'kevoree-api' {
  export function Channel(meta?: TypeMeta): (target: any) => void;
  export function Component(meta?: TypeMeta): (target: any) => void;
  export function Group(meta?: TypeMeta): (target: any) => void;
  export function Node(meta?: TypeMeta): (target: any) => void;
  export function Start(async?: boolean): (target: any, funcName: string) => void;
  export function Stop(async?: boolean): (target: any, funcName: string) => void;
  export function Update(async?: boolean): (target: any, funcName: string) => void;
  export function Input(schema?: Object): (target: any, propertyKey: string) => void;
  export function Output(schema?: Object): (target: any, propertyKey: string) => void;
  export function Param(meta?: ParamMeta): (target: any, propertyKey: string) => void;

  interface ModelService {
    getName(): string;
    getPath(): string;
    getNodeName(): string;
    getCurrentModel(): Object;
    getDeployingModel(): Object;
    getModelInstance(): Object;
    deploy(model: any, done: Callback): void;
  }

  interface OutputPort {
    send(msg: string): void;
    send(msg: string, cb: Callback): void;
  }

  interface Callback {
    (err?: Error): void;
  }

  export class MetaData {
    static TYPE: string;
    static START: string;
    static STOP: string;
    static UPDATE: string;
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
    datatype?: DataType
  }

  export interface ParamData {
    name: string
    type: string
    meta: ParamMeta
  }

  export interface TypeMeta {
    desc?: string
  }

  export enum DataType {
    STRING, BOOLEAN, INTEGER, DECIMAL, LIST, CHAR
  }

  export enum Types {
    Node,
    Group,
    Channel,
    Component
  }
}
