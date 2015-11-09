import 'reflect-metadata';

module KevoreeApi {
    function typeDefinition(target: any, meta: TypeMeta) {
      Reflect.defineMetadata(MetaData.NAME, target.name, target.prototype);
      Reflect.defineMetadata(MetaData.META, meta || {}, target.prototype);
      if (!Reflect.hasMetadata(MetaData.PARAMS, target.prototype)) {
        Reflect.defineMetadata(MetaData.PARAMS, [], target.prototype)
      }
      if (!Reflect.hasMetadata(MetaData.INPUTS, target.prototype)) {
        Reflect.defineMetadata(MetaData.INPUTS, [], target.prototype)
      }
      if (!Reflect.hasMetadata(MetaData.OUTPUTS, target.prototype)) {
        Reflect.defineMetadata(MetaData.OUTPUTS, [], target.prototype)
      }
    }

    export function Channel(meta?: TypeMeta) {
      return function (target: any) {
        Reflect.defineMetadata(MetaData.TYPE, Types.Channel, target.prototype);
        typeDefinition(target, meta)
      };
    }

    export function Component(meta?: TypeMeta) {
      return function (target: any) {
        Reflect.defineMetadata(MetaData.TYPE, Types.Component, target.prototype);
        typeDefinition(target, meta);
      };
    }

    export function Group(meta?: TypeMeta) {
      return function (target: any) {
        Reflect.defineMetadata(MetaData.TYPE, Types.Group, target.prototype);
        typeDefinition(target, meta);
      };
    }

    export function Node(meta?: TypeMeta) {
      return function (target: any) {
        Reflect.defineMetadata(MetaData.TYPE, Types.Node, target.prototype);
        typeDefinition(target, meta);
      };
    }

    function lifecycleMethod(async: boolean, name: string, meta: string) {
        return function (target: any, funcName: string) {
            if (Reflect.hasMetadata(meta, target)) {
                throw new Error(`Only one method must be annotated with @${name}`);
            }

            var params: any[] = Reflect.getMetadata('design:paramtypes', target, funcName);
            if (async) {
                if (params.length === 1 && params[0] instanceof Function) {
                    Reflect.defineMetadata(meta, true, target); // true => asynchronous
                } else {
                    throw new Error(`Asynchronous @${name} expects a callback parameter in the method signature (eg. ${target.constructor.name}.${funcName}(done: Callback))`);
                }
            } else {
                if (params.length === 0) {
                    Reflect.defineMetadata(meta, false, target); // false => synchronous
                } else {
                    throw new Error(`Synchronous @${name} method signature should not define parameters (eg. ${target.constructor.name}.${funcName}())`);
                }
            }
        };
    }

    export function Start(async: boolean = false) {
        return lifecycleMethod(async, 'Start', MetaData.START);
    }

    export function Stop(async: boolean = false) {
        return lifecycleMethod(async, 'Stop', MetaData.STOP);
    }

    export function Update(async: boolean = false) {
        return lifecycleMethod(async, 'Update', MetaData.UPDATE);
    }

    export function Input(schema?: Object) {
      return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(MetaData.MSG_SCHEMA, schema, target, propertyKey);
        var inputs: Array<string> = Reflect.getMetadata(MetaData.INPUTS, target);
        if (!inputs) {
          inputs = [];
          Reflect.defineMetadata(MetaData.INPUTS, inputs, target);
        }
        inputs.push(propertyKey);
      };
    }

    export function Output(schema?: Object) {
      return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(MetaData.MSG_SCHEMA, schema, target, propertyKey);
        var outputs: Array<string> = Reflect.getMetadata(MetaData.OUTPUTS, target);
        if (!outputs) {
          outputs = [];
          Reflect.defineMetadata(MetaData.OUTPUTS, outputs, target);
        }
        outputs.push(propertyKey);
      };
    }

    export function Param(meta?: ParamMeta) {
      return function(target: any, propertyKey: string) {
        var params: Array<ParamData> = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
          params = [];
          Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }

        meta = meta || {};
        if (typeof meta.optional === 'undefined') {
          meta.optional = true;
        }
        if (typeof meta.fragmentDependant === 'undefined') {
          meta.fragmentDependant = false;
        }

        params.push({
          name: propertyKey,
          type: Reflect.getMetadata('design:type', target, propertyKey).name,
          meta: meta
        })
      };
    }

    export class MetaData {
      static TYPE:       string = 'kevoree:type';
      static START:      string = 'kevoree:start';
      static STOP:       string = 'kevoree:stop';
      static UPDATE:     string = 'kevoree:update';
      static META:       string = 'kevoree:meta';
      static NAME:       string = 'kevoree:name';
      static PARAMS:     string = 'kevoree:params';
      static INPUTS:     string = 'kevoree:inputs';
      static OUTPUTS:    string = 'kevoree:outputs';
      static MSG_SCHEMA: string = 'kevoree:msg_schema';
    }

    export interface ParamMeta {
      optional?: boolean
      fragmentDependant?: boolean
      defaultValue?: number | string | boolean
      datatype?: DataType
    }

    export enum DataType {
      STRING, BOOLEAN, INTEGER, DECIMAL, LIST, CHAR
    }

    export interface ParamData {
      name: string
      type: string
      meta: ParamMeta
    }

    export interface TypeMeta {
      desc?: string
    }

    export interface Callback {
        (err?: Error): void;
    }

    export interface ModelService {
        getCurrentModel(): any;
        submitScript(script: string, done?: Callback): void;
    }

    export enum Types {
      Node,
      Group,
      Channel,
      Component
    }
}

export = KevoreeApi;
