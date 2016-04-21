import { Layout } from 'react-grid-layout';
import { Component, Components, LayoutDesc } from '../api';
import {
  Action, Actions, ActionToggleComponent, ActionToggleComponentMenu,
  ActionArrangeLayout, ActionMinifyLayout, ActionLayoutChange
} from '../actions';

export default (components: Components = {}, action: Action) => {
  switch (action.type) {
    case Actions.TOGGLE_COMP:
      return toggleComponent(components, action as ActionToggleComponent);

    case Actions.TOGGLE_COMP_MENU:
      return toggleComponentMenu(components, action as ActionToggleComponentMenu);

    case Actions.ARRANGE_LAYOUT:
      return arrangeLayout(components, action as ActionArrangeLayout);

    case Actions.MINIFY_LAYOUT:
      return minifyLayout(components, action as ActionMinifyLayout);

    case Actions.LAYOUT_CHANGE:
      return layoutChange(components, action as ActionLayoutChange);

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

function arrangeLayout(components: Components, action: ActionArrangeLayout): Components {
  const newComponents: Components = {};
  let x = 0;
  let y = 0;

  Object.keys(components).forEach(name => {
    const layout = Object.assign({}, components[name].layouts[action.breakpoint]);
    if (x + layout.w > action.cols[action.breakpoint]) {
      y += 1;
      x = 0;
    }

    layout.x = x;
    layout.y = y;

    x += layout.w;
    if (x >= action.cols[action.breakpoint]) {
      y += 1;
      x = 0;
    }

    newComponents[name] = Object.assign({}, components[name], {
      layouts: Object.assign({}, components[name].layouts, {
        [action.breakpoint]: layout
      })
    });
  });
  return newComponents;
}

function minifyLayout(components: Components, action: ActionMinifyLayout): Components {
  const newComponents: Components = {};

  Object.keys(components).forEach(name => {
    const layout = Object.assign({}, components[name].layouts[action.breakpoint]);
    layout.w = layout.minW;
    layout.h = layout.minH;

    newComponents[name] = Object.assign({}, components[name], {
      layouts: Object.assign({}, components[name].layouts, {
        [action.breakpoint]: layout
      })
    });
  });
  return newComponents;
}

function layoutChange(components: Components, action: ActionLayoutChange): Components {
  const newComponents: Components = {};
  action.layouts.forEach(layout => {
    const comp: Component = Object.assign({}, {}, components[layout.i]);
    comp.layouts[action.breakpoint] = Object.assign({}, {}, layout);
    newComponents[layout.i] = comp;
  });
  return newComponents;
}
