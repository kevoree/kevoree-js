import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ParamType } from '../../ParamType';
import { NumberParamMeta } from '../metas/NumberParamMeta';

export function IntParam(meta?: NumberParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || {};

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }
        if (typeof meta.default !== 'undefined') {
            if (typeof meta.min !== 'undefined') {
                if (meta.default < meta.min) {
                    throw new Error('@IntParam default value must be greater or equal to \'min\'');
                }
            }

            if (typeof meta.max !== 'undefined') {
                if (meta.default > meta.max) {
                    throw new Error('@IntParam default value must be lesser or equal to \'max\'');
                }
            }
        }

        if (typeof meta.min !== 'undefined' && typeof meta.max !== 'undefined') {
            if (meta.min > meta.max) {
                throw new Error('@IntParam must define \'min\' lesser or equal to \'max\'');
            }
        }

        meta.datatype = ParamType.INTEGER;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
