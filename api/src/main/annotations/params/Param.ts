import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Param() {
  return (target: any, propertyKey: string) => {
    let params = Reflect.getMetadata(MetaData.PARAMS, target);
    if (!params) {
      params = [];
      Reflect.defineMetadata(MetaData.PARAMS, params, target);
    }
    params.push(propertyKey);
  };
}
