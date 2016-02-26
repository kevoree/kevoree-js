import 'reflect-metadata';
import { MetaData } from '../../MetaData';

export function Required(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.REQUIRED, true, target, propertyKey);
}
