import { Action, Actions, ActionBreakpointChange } from '../actions';

export default (breakpoint: string = 'lg', action: Action): string => {
  switch (action.type) {
    case Actions.BRKPT_CHANGE:
      return (action as ActionBreakpointChange).value;

    default:
      return breakpoint;
  }
}
