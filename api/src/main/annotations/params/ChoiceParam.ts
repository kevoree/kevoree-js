import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ChoiceParamMeta } from '../metas/ChoiceParamMeta';

export function ChoiceParam(meta?: ChoiceParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || { choices: [] };

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }

        meta['datatype'] = Reflect.getMetadata('design:type', target, propertyKey).name;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
