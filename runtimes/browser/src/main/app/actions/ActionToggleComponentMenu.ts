import { Action } from './Action';
import { Actions } from './Actions';

export interface ActionToggleComponentMenu extends Action {
  name: string;
  open: boolean;
}
