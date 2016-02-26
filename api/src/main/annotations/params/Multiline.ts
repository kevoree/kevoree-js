import 'reflect-metadata';
import { MetaData } from '../../MetaData';

export function Multiline(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.MULTILINE, true, target, propertyKey);
}
