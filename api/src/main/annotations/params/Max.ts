import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { MinMaxMeta } from '../metas/MinMaxMeta';

export function Max(value: number, exclusive?: boolean) {
    return function (target: any, propertyKey: string) {
        var meta: MinMaxMeta = {
            value: value,
            exclusive: exclusive
        };

        var min: MinMaxMeta = Reflect.getMetadata(MetaData.MIN, target, propertyKey);
        if (min && min.value > meta.value) {
            throw new Error(`@Max(${meta.value}) must be greater or equal to @Min(${min.value})`);
        }

        Reflect.defineMetadata(MetaData.MAX, meta, target, propertyKey);
    };
}
