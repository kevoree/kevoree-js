import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { MinMaxMeta } from '../metas/MinMaxMeta';

export function Min(value: number, exclusive?: boolean) {
    return function (target: any, propertyKey: string) {
        var meta: MinMaxMeta = {
            value: value,
            exclusive: exclusive
        };

        var max: MinMaxMeta = Reflect.getMetadata(MetaData.MAX, target, propertyKey);
        if (max && meta.value > max.value) {
            throw new Error(`@Max(${max.value}) must be greater or equal to @Min(${meta.value})`);
        }

        Reflect.defineMetadata(MetaData.MIN, meta, target, propertyKey);
    };
}
