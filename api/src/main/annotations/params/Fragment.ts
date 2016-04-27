import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Fragment(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.FRAGMENT, true, target, propertyKey);
}
