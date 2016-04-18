import { LayoutDesc } from '../api';
import { Layout } from 'react-grid-layout';
import { Action, Actions, ActionLayoutChange } from '../actions';

const initVal: LayoutDesc<Layout[]> = {
  lg: [], md: [], sm: [], xs: [], xxs: []
};

export default (layouts: LayoutDesc<Layout[]> = initVal, action: Action) => {
  switch (action.type) {
    case Actions.LAYOUT_CHANGE:
      return layoutChange(layouts, action as ActionLayoutChange);

    default:
      return layouts;
  }
};

function layoutChange(layouts: LayoutDesc<Layout[]>, action: ActionLayoutChange): LayoutDesc<Layout[]> {
  return Object.assign({}, {}, action.layouts);
}
