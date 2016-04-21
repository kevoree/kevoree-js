import { LayoutDesc } from '../api';
import { Actions, ActionBreakpointsChange } from '../actions';

const initVal = { lg: 0, md: 0, sm: 0, xs: 0, xxs: 0 };

export default (breakpoints: LayoutDesc<number> = initVal, action: ActionBreakpointsChange): LayoutDesc<number> => {
  switch (action.type) {
    case Actions.BRKPTS_CHANGE:
      return Object.assign({}, breakpoints, { [action.key]: action.value });

    default:
      return breakpoints;
  }
};
