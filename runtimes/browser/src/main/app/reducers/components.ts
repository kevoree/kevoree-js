import { State, Components } from '../api';
import {
  Action, Actions, ActionToggleComponent, ActionToggleComponentMenu
} from '../actions';

export default (components: Components = {}, action: Action) => {
  switch (action.type) {
    case Actions.TOGGLE_COMP:
      return toggleComponent(components, action as ActionToggleComponent);

    case Actions.TOGGLE_COMP_MENU:
      return toggleComponentMenu(components, action as ActionToggleComponentMenu);

    default:
      return components;
  }
};

function toggleComponent(components: Components, action: ActionToggleComponent): Components {
  return Object.assign({}, components, {
    [action.name]: Object.assign({}, components[action.name], {
      hide: action.hidden
    })
  });
}

function toggleComponentMenu(components: Components, action: ActionToggleComponentMenu): Components {
  return Object.assign({}, components, {
    [action.name]: Object.assign({}, components[action.name], {
      menuOpen: action.open
    })
  });
}
