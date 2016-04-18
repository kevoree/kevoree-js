import { AppBar } from '../api';
import { Action, Actions, ActionToggleAppBar } from '../actions';

const initVal: AppBar = { open: false };

export default (appbar: AppBar = initVal, action: Action) => {
  switch (action.type) {
    case Actions.TOGGLE_APP_BAR:
      return toggleAppBar(appbar, action as ActionToggleAppBar);

    default:
      return appbar;
  }
};

function toggleAppBar(appbar: AppBar, action: ActionToggleAppBar) {
  return Object.assign({}, {}, { open: action.open });
}
