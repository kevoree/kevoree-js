import { Action } from './Action';
import { Actions } from './Actions';

export interface ActionBreakpointsChange extends Action {
  key: string;
  value: number;
}
