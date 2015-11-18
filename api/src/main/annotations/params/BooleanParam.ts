import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ParamType } from '../../ParamType';
import { BooleanParamMeta } from '../metas/BooleanParamMeta';


export function BooleanParam(meta?: BooleanParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || {};

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }

        meta.datatype = ParamType.BOOLEAN;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
