import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { LengthMeta } from '../metas/LengthMeta';

export function Length(value: number) {
    return function (target: any, propertyKey: string) {
        var meta: LengthMeta = { value: value };
        Reflect.defineMetadata(MetaData.LENGTH, meta, target, propertyKey);
    };
}
