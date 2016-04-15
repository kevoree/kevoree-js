import { State } from '../api';
import { ActionColsChange } from '../actions';

export default function colsChange(state: State, action: ActionColsChange): State {
  return Object.assign({}, state, {
    cols: Object.assign({}, state.cols, { [action.key]: action.value })
  });
}
