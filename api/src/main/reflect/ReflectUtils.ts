import 'reflect-metadata';
import { MetaData } from '../api/MetaData';
import { LifecycleMeta } from '../annotations/metas/LifecycleMeta';
import { ParamType } from '../annotations/metas/ParamMeta';
import { Fragment } from '../annotations/params/Fragment';
import { Required } from '../annotations/params/Required';
import { ParamDetails } from './ParamDetails';

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

  static getParams(instance: any): ParamDetails[] {
    const proto = Object.getPrototypeOf(instance);
    const params: { name: string, type: ParamType }[] = Reflect.getMetadata(MetaData.PARAMS, proto) || [];
    return params.map(metas => {
      switch (metas.type) {
        case 'string':
          return ReflectUtils.processStringParam(instance, metas);
        case 'boolean':
          return ReflectUtils.processBooleanParam(instance, metas);
        case 'array':
          return ReflectUtils.processArrayParam(instance, metas);
        case 'choice':
          return ReflectUtils.processChoiceParam(instance, metas);
        case 'int':
        case 'float':
        case 'double':
        case 'short':
        case 'long':
          return ReflectUtils.processNumberParam(instance, metas);
      }
    });
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

  private static processStringParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param = ReflectUtils.initParam(instance, metas);
    const multi: boolean = Reflect.getMetadata(MetaData.MULTILINE, instance, metas.name);
    if (multi) {
      param.multi = multi;
    }
    const length: number = Reflect.getMetadata(MetaData.LENGTH, instance, metas.name);
    if (typeof length === 'number') {
      param.length = length;
    }
    return param;
  }

  private static processNumberParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param = ReflectUtils.initParam(instance, metas);
    const min: number = Reflect.getMetadata(MetaData.MIN, instance, metas.name);
    if (typeof min !== 'undefined') {
      param.min = min;
    }
    const max: number = Reflect.getMetadata(MetaData.MAX, instance, metas.name);
    if (typeof max !== 'undefined') {
      param.max = max;
    }
    return param;
  }

  private static processBooleanParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param = ReflectUtils.initParam(instance, metas);
    return param;
  }

  private static processArrayParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param = ReflectUtils.initParam(instance, metas);
    return param;
  }

  private static processChoiceParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param = ReflectUtils.initParam(instance, metas);
    param.choices = Reflect.getMetadata(MetaData.CHOICES, instance, metas.name) || [];
    return param;
  }

  private static initParam(instance: any, metas: { name: string, type: ParamType }): ParamDetails {
    const param: ParamDetails = {
      name: metas.name,
      type: metas.type,
      fragment: Reflect.getMetadata(MetaData.FRAGMENT, instance, metas.name) || false,
      required: Reflect.getMetadata(MetaData.REQUIRED, instance, metas.name) || false
    };
    return param;
  }
}
