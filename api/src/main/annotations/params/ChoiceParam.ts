import 'reflect-metadata';
import { MetaData } from '../../MetaData';
import { ParamType } from '../../ParamType';
import { ChoiceParamMeta } from '../metas/ChoiceParamMeta';

export function ChoiceParam(meta?: ChoiceParamMeta) {
    return function(target: any, propertyKey: string) {
        meta = meta || { choices: [] };

        if (typeof meta.optional === 'undefined') { meta.optional = true; }
        if (typeof meta.fragment === 'undefined') { meta.fragment = false; }
        if (typeof meta.choices === 'undefined') { meta.choices = []; }

        if (typeof meta.defaultIndex !== 'undefined') {
            if (meta.defaultIndex > meta.choices.length - 1) {
                throw new Error(`@ChoiceParam on ${propertyKey} defines a defaultIndex that is out of bound regarding the choices. (min: 0, max: ${meta.choices.length-1})`);
            }
        }

        meta.datatype = ParamType.CHOICES;

        var params = Reflect.getMetadata(MetaData.PARAMS, target);
        if (!params) {
            params = [];
            Reflect.defineMetadata(MetaData.PARAMS, params, target);
        }
        params.push(propertyKey);

        Reflect.defineMetadata(MetaData.PARAM, meta, target, propertyKey);
    };
}
