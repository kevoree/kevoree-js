import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ParamType } from '../../ParamType';
import { StringParamMeta } from '../metas/StringParamMeta';

export function StringParam(meta?: StringParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || {};

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }
        if (typeof meta.multiline === 'undefined') { meta.multiline = false; }

        meta.datatype = ParamType.STRING;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
