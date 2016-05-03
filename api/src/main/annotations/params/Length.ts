import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Length(value: number) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(MetaData.LENGTH, value, target, propertyKey);
    };
}
