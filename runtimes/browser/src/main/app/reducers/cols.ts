import { State, LayoutDesc } from '../api';
import { Layout } from 'react-grid-layout';
import { Action, Actions, ActionColsChange } from '../actions';

const initVal: LayoutDesc<number> = {
  lg: 0, md: 0, sm: 0, xs: 0, xxs: 0
};

export default (cols: LayoutDesc<number> = initVal, action: Action) => {
  switch (action.type) {
    case Actions.COLS_CHANGE:
      return colsChange(cols, action as ActionColsChange);

    default:
      return cols;
  }
};

function colsChange(cols: LayoutDesc<number>, action: ActionColsChange): LayoutDesc<number> {
  return Object.assign({}, cols, { [action.key]: action.value });
}
