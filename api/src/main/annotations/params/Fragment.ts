import 'reflect-metadata';
import { MetaData } from '../../MetaData';

export function Fragment(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.FRAGMENT, true, target, propertyKey);
}
