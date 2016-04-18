import { Action } from './Action';
import { Actions } from './Actions';

export interface ActionColsChange extends Action {
  key: string;
  value: number;
}
