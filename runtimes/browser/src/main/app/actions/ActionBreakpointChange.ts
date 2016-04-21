import { Action } from './Action';
import { Actions } from './Actions';

export interface ActionBreakpointChange extends Action {
  value: string;
}
