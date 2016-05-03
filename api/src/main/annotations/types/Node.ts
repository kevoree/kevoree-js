import 'reflect-metadata';
import { TypeMeta } from '../metas/TypeMeta';
import { MetaData } from '../../api/MetaData';
import { typeDefinition } from './typeDefinition';
import { TypeEnum } from '../../api/TypeEnum';

export function Node(meta: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, TypeEnum.NODE, target.prototype);
    typeDefinition(target, meta);
    return target;
  };
}
