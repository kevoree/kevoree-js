import { createStore, Store } from 'redux';
import { Random } from '../util/Random';
import { State, Component, Components } from '../api';
import {
  Action, Actions, ActionColsChange, ActionLayoutChange
} from '../actions';
import colsChange from '../reducers/colsChange';
import layoutChange from '../reducers/layoutChange';

function genRandomComponents(): Components {
  var components = new Components();
  const max = 10, min = 3;
  const count = Random.gen(min, max);
  for (var i=0; i < count; i++) {
    const name = 'comp' + i;
    components[name] = {
      name: name,
      type: ['AsyncWebSocketConsolePrinter', 'ConsolePrinter', 'Chart'][Random.gen(0, 2)],
      hide: false,
      layout: {
        w: Random.gen(1, 6),
        h: Random.gen(1, 3)
      }
    };
  }
  return components;
}

const initialState: State = {
  components: genRandomComponents(),
  layouts:    { lg: [], md: [], sm: [], xs: [], xxs: [] },
  cols:       { lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 }
};

export const store: Store<State, Action> = createStore<State, Action>((state: State, action: Action) => {
  switch (action.type) {
    case Actions.COLS_CHANGE:
      return colsChange(state, action as ActionColsChange);

    case Actions.LAYOUT_CHANGE:
      return layoutChange(state, action as ActionLayoutChange);

    default:
      return state;
  }
}, initialState, (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f);
