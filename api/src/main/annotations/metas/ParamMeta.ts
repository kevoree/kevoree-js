import { DataType } from '../../DataType';

export interface ParamMeta {
  optional?: boolean
  fragmentDependant?: boolean
  defaultValue?: number | string | boolean
  datatype?: DataType
}
