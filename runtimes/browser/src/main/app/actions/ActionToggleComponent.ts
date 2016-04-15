import { Action } from './Action';
import { Actions } from './Actions';

export class ActionToggleComponent implements Action {
  type = Actions.TOGGLE_COMP;
  name: string;
  hidden: boolean;
}
