import 'reflect-metadata';
import { MetaData } from './metas/MetaData';
import { ParamMeta } from './metas/ParamMeta';
import { ParamData } from './metas/ParamData';

export function Param(meta?: ParamMeta) {
  return function(target: any, propertyKey: string) {
    var params: Array<ParamData> = Reflect.getMetadata(MetaData.PARAMS, target);
    if (!params) {
      params = [];
      Reflect.defineMetadata(MetaData.PARAMS, params, target);
    }

    meta = meta || {};
    if (typeof meta.optional === 'undefined') {
      meta.optional = true;
    }
    if (typeof meta.fragmentDependant === 'undefined') {
      meta.fragmentDependant = false;
    }

    params.push({
      name: propertyKey,
      type: Reflect.getMetadata('design:type', target, propertyKey).name,
      meta: meta
    })
  };
}
