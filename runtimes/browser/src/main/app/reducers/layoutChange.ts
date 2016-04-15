import { State } from '../api';
import { Actions, ActionLayoutChange } from '../actions';

export default function layoutChange(state: State, action: ActionLayoutChange): State {
  return Object.assign({}, state, {
    layouts: Object.assign({}, {}, action.layouts)
  });
}
