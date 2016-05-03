import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';
import { ParamMeta } from '../metas/ParamMeta';

export function Param(metas?: ParamMeta) {
  return (target: any, propertyKey: string) => {
    let params = Reflect.getMetadata(MetaData.PARAMS, target);
    if (!params) {
      params = [];
      Reflect.defineMetadata(MetaData.PARAMS, params, target);
    }
    if (params.indexOf(propertyKey) === -1) {
      if (!metas) {
        metas = {};
        const designType = Reflect.getMetadata('design:type', target, propertyKey);
        if (designType === Number) {
          console.warn(`@Param "${propertyKey}" in ${target.constructor.name} did not precise the type of the number. Using "int" by default.`);
          metas.type = 'int';
        } else if (designType === String) {
          metas.type = 'string';
        } else if (designType === Boolean) {
          metas.type = 'boolean';
        } else if (designType === Array) {
          metas.type = 'array';
        } else {
          throw new Error(`@Param() "${propertyKey}" in ${target.constructor.name} without type meta must be of type Number|String|Boolean|Array`);
        }
      }
      params.push({ name: propertyKey, type: metas.type });
    } else {
      throw new Error(`@Param() "${propertyKey}" already exists in ${target.constructor.name}`);
    }
  };
}
