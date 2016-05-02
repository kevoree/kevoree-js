import 'reflect-metadata';
import { MetaData, LifecycleMeta, MinMaxMeta } from 'kevoree-api';

export interface Param {
  name: string;
  type: 'string' | 'number' | 'boolean';
  min?: number;
  max?: number;
  multi?: boolean;
}

export class ReflectUtils {

  /**
   * Returns the given instance's metadata attached
   * to the `@OnStart` method.
   * The returned metas can be undefined if the type
   * did not specify any `@OnStart`
   */
  static getOnStart(instance: any): LifecycleMeta {
    const proto = Object.getPrototypeOf(instance);
    return Reflect.getMetadata(MetaData.ON_START, proto);
  }

  /**
   * Calls the given instance `@OnStart` decorated method if any.
   */
  static callOnStart(instance: any, callback: (err?: Error) => void) {
    const proto = Object.getPrototypeOf(instance);
    const metas: LifecycleMeta =  Reflect.getMetadata(MetaData.ON_START, proto);
    ReflectUtils.doCall(instance, metas, callback);
  }

  /**
   * Calls the given instance `@OnStop` decorated method if any.
   */
  static callOnStop(instance: any, callback: (err?: Error) => void) {
    const proto = Object.getPrototypeOf(instance);
    const metas: LifecycleMeta =  Reflect.getMetadata(MetaData.ON_STOP, proto);
    ReflectUtils.doCall(instance, metas, callback);
  }

  /**
   * Calls the given instance `@OnUpdate` decorated method if any.
   */
  static callOnUpdate(instance: any, callback: (err?: Error) => void) {
    const proto = Object.getPrototypeOf(instance);
    const metas: LifecycleMeta =  Reflect.getMetadata(MetaData.ON_UPDATE, proto);
    ReflectUtils.doCall(instance, metas, callback);
  }

  static getInputs(instance: any): string[] {
    return Reflect.getMetadata(MetaData.INPUTS, Object.getPrototypeOf(instance));
  }

  static getOutputs(instance: any): string[] {
    return Reflect.getMetadata(MetaData.OUTPUTS, Object.getPrototypeOf(instance));
  }

  static getParams(instance: any): Param[] {
    const proto = Object.getPrototypeOf(instance);
    return Reflect.getMetadata(MetaData.PARAMS, proto).map((name: string) => {
      const nativeType = Reflect.getMetadata('design:type', instance, name);
      const type = ReflectUtils.getTypeAsString(nativeType);
      const param: Param = { name: name, type: type };
      switch (type) {
        case 'string':
          const multi: boolean = Reflect.getMetadata(MetaData.MULTILINE, instance, name);
          if (multi) {
            param.multi = multi;
          }
          break;

        case 'number':
          const min: MinMaxMeta = Reflect.getMetadata(MetaData.MIN, instance, name);
          if (min) {
            param.min = min.value;
            if (min.exclusive) {
              param.min = param.min + 1;
            }
          }
          const max: MinMaxMeta = Reflect.getMetadata(MetaData.MAX, instance, name);
          if (max) {
            param.max = max.value;
            if (max.exclusive) {
              param.max = param.max + 1;
            }
          }
          break;
      }
      return param;
    });
  }

  private static getTypeAsString(type: any): 'string' | 'number' | 'boolean' {
    if (type === Number) {
      return 'number';
    } else if (type === String) {
      return 'string';
    } else if (type === Boolean) {
      return 'boolean';
    } else {
      return 'string';
    }
  }

  private static doCall(instance: any, metas: LifecycleMeta, callback: (err?: Error) => void) {
    if (metas) {
      if (metas.async) {
        instance[metas.name](callback);
      } else {
        try {
          instance[metas.name]();
          callback();
        } catch (err) {
          callback(err);
        }
      }
    } else {
      callback();
    }
  }
}
