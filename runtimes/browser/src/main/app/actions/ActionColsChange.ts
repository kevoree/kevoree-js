import { Action } from './Action';
import { Actions } from './Actions';

export class ActionColsChange implements Action {
  type = Actions.COLS_CHANGE;
  key: string;
  value: number;
}
