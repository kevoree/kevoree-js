import { TypeMeta } from '../annotations/metas/TypeMeta';
import { MetaData } from '../MetaData';

export function typeDefinition(target: any, meta: TypeMeta) {
  Reflect.defineMetadata(MetaData.NAME, target.name, target.prototype);
  Reflect.defineMetadata(MetaData.VERSION, meta.version, target.prototype);
  Reflect.defineMetadata(MetaData.META, meta || {}, target.prototype);
  
  if (!Reflect.hasMetadata(MetaData.PARAMS, target.prototype)) {
    Reflect.defineMetadata(MetaData.PARAMS, [], target.prototype)
  }
  if (!Reflect.hasMetadata(MetaData.INPUTS, target.prototype)) {
    Reflect.defineMetadata(MetaData.INPUTS, [], target.prototype)
  }
  if (!Reflect.hasMetadata(MetaData.OUTPUTS, target.prototype)) {
    Reflect.defineMetadata(MetaData.OUTPUTS, [], target.prototype)
  }
}
