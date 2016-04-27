import { Layout } from 'react-grid-layout';
import { Components } from './Component';
import { LayoutDesc } from './LayoutDesc';
import { AppBar } from './AppBar';

export interface State {
  cols: LayoutDesc<number>;
  appbar: AppBar;
  components: Components;
  breakpoints: LayoutDesc<number>;
  currentBrkpt: string;
  devMode: boolean;
}
