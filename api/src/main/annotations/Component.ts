import 'reflect-metadata';
import { TypeMeta } from './metas/TypeMeta';
import { MetaData } from './metas/MetaData';
import { typeDefinition } from '../util/typeDefinition';
import { TypeEnum } from '../TypeEnum';

export function Component(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, TypeEnum.Component, target.prototype);
    typeDefinition(target, meta);
  };
}
