import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { NumberTypeMeta } from '../metas/NumberTypeMeta';

export function NumberType(type: NumberTypeMeta) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(MetaData.NUMBER_TYPE, type, target, propertyKey);
    };
}
