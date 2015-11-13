import 'reflect-metadata';
import { MetaData } from './metas/MetaData';

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
