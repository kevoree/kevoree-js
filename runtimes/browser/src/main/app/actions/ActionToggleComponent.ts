import { Action } from './Action';
import { Actions } from './Actions';

export interface ActionToggleComponent extends Action {
  name: string;
  hidden: boolean;
}
