import 'reflect-metadata';
import { MetaData } from '../MetaData';

export function Output(schema?: Object) {
    return function(target: any, funcName: string) {
        var params: any[] = Reflect.getMetadata('design:paramtypes', target, funcName);
        if (params.length === 1 && params[0] instanceof String) {
            Reflect.defineMetadata(MetaData.MSG_SCHEMA, schema, target, funcName);
            var outputs: Array<string> = Reflect.getMetadata(MetaData.OUTPUTS, target);
            if (!outputs) {
                outputs = [];
                Reflect.defineMetadata(MetaData.OUTPUTS, outputs, target);
            }
            outputs.push(funcName);
        } else {
            throw new Error(`@Output method ${funcName}() must have a string parameter in its signature ie. ${funcName}(msg: string)`);
        }
    };
}
