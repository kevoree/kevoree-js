import { ParamType } from '../annotations/metas/ParamMeta';
import { ChoicesType } from '../annotations/params/Choices';

export interface ParamDetails {
  name: string;
  type: ParamType;
  fragment: boolean;
  required: boolean;
  min?: number;
  max?: number;
  multi?: boolean;
  length?: number;
  choices?: Array<any>;
}
