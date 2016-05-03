import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Max(value: number) {
    return function (target: any, propertyKey: string) {
        var min: number = Reflect.getMetadata(MetaData.MIN, target, propertyKey);
        if (min && min > value) {
            throw new Error(`@Max(${value}) must be greater or equal to @Min(${min})`);
        }

        Reflect.defineMetadata(MetaData.MAX, value, target, propertyKey);
    };
}
