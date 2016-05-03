import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Min(value: number) {
    return function (target: any, propertyKey: string) {
        var max: number = Reflect.getMetadata(MetaData.MAX, target, propertyKey);
        if (max && value > max) {
            throw new Error(`@Max(${max}) must be greater or equal to @Min(${value})`);
        }

        Reflect.defineMetadata(MetaData.MIN, value, target, propertyKey);
    };
}
