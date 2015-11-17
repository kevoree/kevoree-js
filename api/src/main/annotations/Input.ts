import 'reflect-metadata';
import { MetaData } from '../MetaData';

export function Input(schema?: Object) {
    return function(target: any, funcName: string) {
        var params: any[] = Reflect.getMetadata('design:paramtypes', target, funcName);
        if (params.length === 1 && params[0] === String) {
            Reflect.defineMetadata(MetaData.MSG_SCHEMA, schema, target, funcName);
            var inputs: Array<string> = Reflect.getMetadata(MetaData.INPUTS, target);
            if (!inputs) {
                inputs = [];
                Reflect.defineMetadata(MetaData.INPUTS, inputs, target);
            }
            inputs.push(funcName);
        } else {
            throw new Error(`@Input method ${funcName}() must have a string parameter in its signature ie. ${funcName}(msg: string)`);
        }
    };
}
