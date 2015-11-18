import { ParamType } from '../../ParamType';

export interface ParamMeta {
    optional?: boolean
    fragment?: boolean
    datatype?: ParamType
}
