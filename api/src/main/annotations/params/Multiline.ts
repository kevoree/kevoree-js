import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export function Multiline(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.MULTILINE, true, target, propertyKey);
}
