import { createStore, combineReducers, Store } from 'redux';
import { Random } from '../util/Random';
import { State, Component, Components } from '../api';
import { Action } from '../actions';
import { appbar, components, layouts, cols } from '../reducers';

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
      menuOpen: false,
      layout: {
        w: Random.gen(1, 2),
        h: Random.gen(1, 2)
      }
    };
  }
  return components;
}

const initialState: State = {
  appbar:     { open: false },
  components: genRandomComponents(),
  layouts:    { lg: [], md: [], sm: [], xs: [], xxs: [] },
  cols:       { lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 },
};

export const store: Store<State, Action> = createStore<State, Action>(
  combineReducers<State, Action>({
    cols: cols,
    appbar: appbar,
    layouts: layouts,
    components: components
  }),
  initialState,
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
);
