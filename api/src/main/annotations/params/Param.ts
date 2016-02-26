import 'reflect-metadata';
import { MetaData } from '../../MetaData';

export function Param(target: any, propertyKey: string) {
    var params = Reflect.getMetadata(MetaData.PARAMS, target);
    if (!params) {
        params = [];
        Reflect.defineMetadata(MetaData.PARAMS, params, target);
    }
    params.push(propertyKey);
}
