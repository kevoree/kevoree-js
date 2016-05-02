import 'reflect-metadata';
import { MetaData, LifecycleMeta } from 'kevoree-api';

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
