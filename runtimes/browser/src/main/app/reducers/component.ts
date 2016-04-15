import { State } from '../api';
import { ActionToggleComponent } from '../actions';

export default function toggleComponent(state: State, action: ActionToggleComponent): State {
  return Object.assign({}, state, {
    components: Object.assign({}, state.components, {
      [action.name]: Object.assign({}, state.components[action.name], {
        hide: action.hidden
      })
    })
  });
}
