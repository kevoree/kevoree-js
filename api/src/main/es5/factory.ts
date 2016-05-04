import 'reflect-metadata';
import { Inject } from 'ts-injector';
import { Component as CompAnno } from '../annotations/types/Component';
import { Node as NodeAnno } from '../annotations/types/Node';
import { Channel as ChanAnno } from '../annotations/types/Channel';
import { ModelConnector as MConAnno } from '../annotations/types/ModelConnector';
import { TypeMeta } from '../annotations/metas/TypeMeta';
import { Input as InputAnno } from '../annotations/ports/Input';
import { Output as OutputAnno } from '../annotations/ports/Output';
import { Inject as InjectAnno } from 'ts-injector';

export namespace Factory {
  export type TypeMetas = { name: string } & TypeMeta;
  export interface InjectMetas {
    [key:string]: { name: string };
  }
  export interface PortMetas {
    [key: string]: Object;
  }

  export function Component(metas: TypeMetas): ComponentFactory {
    return new ComponentFactoryImpl(metas);
  }

  export function Node(metas: TypeMetas): NodeFactory {
    return new NodeFactoryImpl(metas);
  }

  export function Channel(metas: TypeMetas): ChannelFactory {
    return new ChannelFactoryImpl(metas);
  }

  export function ModelConnector(metas: TypeMetas): ModelConnectorFactory {
    return new ModelConnectorFactoryImpl(metas);
  }

  export interface TypeConstructor<T> {
    name: string;
    new(...args: any[]): T;
    prototype: T & { constructor: FunctionConstructor };
    constructor: FunctionConstructor;
  }

  export interface Factory {
    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T>;
  }

  export interface ComponentFactory extends Factory {
    Inject(metas: InjectMetas): ComponentFactory;
    Input(metas: PortMetas): ComponentFactory;
    Output(metas: PortMetas): ComponentFactory;
  }

  export interface NodeFactory extends Factory {
    Inject(metas: InjectMetas): NodeFactory;
  }
  export interface ChannelFactory extends Factory {
    Inject(metas: InjectMetas): ChannelFactory;
  }
  export interface ModelConnectorFactory extends Factory {
    Inject(metas: InjectMetas): ModelConnectorFactory;
  }

  abstract class AbstractFactory implements Factory {
    protected defaultName = 'AnonymousType';
    protected metas: Factory.TypeMetas;
    protected type: any;
    protected injects: InjectMetas;

    constructor(metas: Factory.TypeMetas) {
      this.metas = metas;
      this.injects = {};
    }

    Inject(metas: InjectMetas): Factory {
      this.injects = metas;
      return this;
    }

    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T> {
      if (proto.hasOwnProperty('constructor')) {
        this.type = proto.constructor;
      } else {
        this.type = function () {};
      }

      if (!this.type.name || this.type.name.length === 0) {
        Object.defineProperty(this.type, 'name', {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this.metas.name || this.defaultName
        });
      }

      const prototype = {};
      for (const prop in proto) {
        if (proto.hasOwnProperty(prop)) {
          if (prop !== 'constructor') {
            prototype[prop] = proto[prop];
          }
        }
      }

      this.type.prototype = prototype;

      Object.keys(this.injects).forEach(name => {
        Reflect.decorate([
            InjectAnno(this.injects[name]),
            Reflect.metadata('design:type', Object)
        ], this.type.prototype, name, void 0);
      });

      return this.type;
    }
  }

  class ComponentFactoryImpl extends AbstractFactory implements ComponentFactory {
    private inputs: PortMetas;
    private outputs: PortMetas;

    constructor(metas: Factory.TypeMetas) {
      super(metas);
      this.defaultName = 'AnonymousComponent';
      this.inputs = {};
      this.outputs = {};
    }

    Inject(metas: InjectMetas): ComponentFactory {
      return <ComponentFactory> super.Inject(metas);
    }

    Input(metas: PortMetas): ComponentFactory {
      this.inputs = metas;
      return this;
    }

    Output(metas: PortMetas): ComponentFactory {
      this.outputs = metas;
      return this;
    }

    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T> {
      this.type = super.Class(proto);

      Reflect.decorate([CompAnno({
        version: this.metas.version,
        description: this.metas.description
      })], this.type);

      Object.keys(this.inputs).forEach(name => {
        Reflect.decorate([
          InputAnno(this.inputs[name]),
          Reflect.metadata('design:type', Function),
          Reflect.metadata('design:paramtypes', [String]),
          Reflect.metadata('design:returntype', null)
        ], this.type.prototype, name);
      });

      Object.keys(this.outputs).forEach(name => {
        Reflect.decorate([
          OutputAnno(this.outputs[name]),
          Reflect.metadata('design:type', Object)
        ], this.type.prototype, name, void 0);
      });

      return this.type;
    }
  }

  class NodeFactoryImpl extends AbstractFactory implements NodeFactory {
    constructor(metas: TypeMetas) {
      super(metas);
      this.defaultName = 'AnonymousNode';
    }

    Inject(metas: InjectMetas): NodeFactory {
      return <NodeFactory> super.Inject(metas);
    }

    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T> {
      this.type = super.Class(proto);

      Reflect.decorate([NodeAnno({
        version: this.metas.version,
        description: this.metas.description
      })], this.type);

      return this.type;
    }
  }

  class ChannelFactoryImpl extends AbstractFactory implements ChannelFactory {
    constructor(metas: TypeMetas) {
      super(metas);
      this.defaultName = 'AnonymousChannel';
    }

    Inject(metas: InjectMetas): ChannelFactory {
      return <ChannelFactory> super.Inject(metas);
    }

    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T> {
      this.type = super.Class(proto);

      Reflect.decorate([ChanAnno({
        version: this.metas.version,
        description: this.metas.description
      })], this.type);

      return this.type;
    }
  }

  class ModelConnectorFactoryImpl extends AbstractFactory implements ModelConnectorFactory {
    constructor(metas: TypeMetas) {
      super(metas);
      this.defaultName = 'AnonymousModelConnector';
    }

    Inject(metas: InjectMetas): ModelConnectorFactory {
      return <ModelConnectorFactory> super.Inject(metas);
    }

    Class<T extends { [key:string]: any }>(proto: T): TypeConstructor<T> {
      this.type = super.Class(proto);

      Reflect.decorate([MConAnno({
        version: this.metas.version,
        description: this.metas.description
      })], this.type);

      return this.type;
    }
  }
}
