import 'reflect-metadata';
import { TypeMeta } from '../metas/TypeMeta';
import { MetaData } from '../../MetaData';
import { typeDefinition } from '../../util/typeDefinition';
import { TypeEnum } from '../../TypeEnum';

export function ModelConnector(meta: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, TypeEnum.MCON, target.prototype);
    typeDefinition(target, meta);
    return target;
  };
}
