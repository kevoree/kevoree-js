declare module 'kevoree-api' {
  export enum Services {
      ModelService = 0,
      LoggerService = 1,
  }
  export enum Types {
      Node = 0,
      Group = 1,
      Channel = 2,
      Component = 3,
  }
  export function Channel(meta?: TypeMeta): (target: any) => void;
  export function Component(meta?: TypeMeta): (target: any) => void;
  export function Group(meta?: TypeMeta): (target: any) => void;
  export function Node(meta?: TypeMeta): (target: any) => void;
  export function Inject(service: Services): (target: any, propertyKey: string) => void;
  export function Input(target: any, propertyKey: string): void;
  export function Output(target: any, propertyKey: string): void;
  export function Param(meta?: ParamMeta): (target: any, propertyKey: string) => void;
  export interface Callback {
      (err?: Error): void;
  }
  export interface ModelService {
      getName(): string;
      getPath(): string;
      getNodeName(): string;
      getCurrentModel(): Object;
      getDeployingModel(): Object;
      getModelInstance(): Object;
      deploy(model: Object, done: Callback): void;
  }
  export interface ParamMeta {
    optional?: boolean
    fragmentDependant?: boolean
    defaultValue?: number | string
  }

  export interface ParamData {
    name: string
    type: string
    meta: ParamMeta
  }

  export interface TypeMeta {
    desc?: string
  }

  export interface InjectData {
    propertyKey: string
    service: Services
  }
}
