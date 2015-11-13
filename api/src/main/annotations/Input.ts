import 'reflect-metadata';
import { MetaData } from './metas/MetaData';

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
