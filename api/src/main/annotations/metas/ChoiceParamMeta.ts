import { ParamMeta } from './ParamMeta';

export interface ChoiceParamMeta extends ParamMeta {
    choices?: string[];
    defaultIndex?: number;
}