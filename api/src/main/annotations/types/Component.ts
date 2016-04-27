import 'reflect-metadata';
import { TypeMeta } from '../metas/TypeMeta';
import { MetaData } from '../../api/MetaData';
import { typeDefinition } from '../../util/typeDefinition';
import { TypeEnum } from '../../api/TypeEnum';

export function Component(meta: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, TypeEnum.COMPONENT, target.prototype);
    typeDefinition(target, meta);
    return target;
  };
}
