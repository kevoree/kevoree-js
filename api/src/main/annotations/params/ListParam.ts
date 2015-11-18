import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ParamType } from '../../ParamType';
import { ListParamMeta } from '../metas/ListParamMeta';

export function ListParam(meta?: ListParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || {};

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }
        if (typeof meta.default === 'undefined') { meta.default = []; }

        var propType = Reflect.getMetadata('design:type', target, propertyKey);

        meta.datatype = ParamType.LIST;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
