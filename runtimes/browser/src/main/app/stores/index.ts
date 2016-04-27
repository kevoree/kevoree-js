import { createStore, combineReducers, Store } from 'redux';
import { Random } from '../util/Random';
import { State, Component, Components } from '../api';
import { Action, Actions } from '../actions';
import { appbar, components, cols, breakpoint, breakpoints } from '../reducers';

const COLS = { lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 };
const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

const initialState: State = {
  appbar:         { open: false },
  cols:           COLS,
  breakpoints:    BREAKPOINTS,
  components:     genRandomComponents(),
  currentBrkpt:   'lg',
  devMode:        false
};

export const store: Store<State, Action> = createStore<State, Action>(
  combineReducers<State, Action>({
    cols: cols,
    appbar: appbar,
    components: components,
    breakpoints: breakpoints,
    currentBrkpt: breakpoint,
    devMode: (state: boolean = false, action: Action) => {
      if (action.type === 'TOGGLE_DEVMODE') {
        return !state;
      }
      return state;
    }
  }),
  initialState,
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
);

function genRandomComponents(): Components {
  const compList = new Components();
  const max = 20, min = 5;
  const count = Random.gen(min, max);

  let x = 0, y = 0;
  for (let i=0; i < count; i++) {
    const name = 'comp' + i;
    const minW = Random.gen(1, 2);
    const minH = Random.gen(1, 2);
    const w = Random.gen(minW, 3);
    const h = Random.gen(minH, 3);

    if (x + w > 6) {
      y += 1;
      x = 0;
    }

    compList[name] = {
      name: name,
      type: ['AsyncWebSocketConsolePrinter', 'ConsolePrinter', 'Chart'][Random.gen(0, 2)],
      hide: false,
      layouts: {
        lg:  { i: name, x: x, y: y, w: w, h: h, minW: minW, minH: minH },
        md:  { i: name, x: x, y: y, w: w, h: h, minW: minW, minH: minH },
        sm:  { i: name, x: x, y: y, w: w, h: h, minW: minW, minH: minH },
        xs:  { i: name, x: x, y: y, w: w, h: h, minW: minW, minH: minH },
        xxs: { i: name, x: x, y: y, w: w, h: h, minW: minW, minH: minH }
      }
    };

    x += w;
    if (x >= 6) {
      y += 1;
      x = 0;
    }
  }
  return components(compList, { type: Actions.ARRANGE_LAYOUT, cols: COLS } as Action);
}
