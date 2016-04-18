import { Layout } from 'react-grid-layout';
import { Components } from './Component';
import { LayoutDesc } from './LayoutDesc';
import { AppBar } from './AppBar';

export interface State {
  appbar: AppBar;
  components: Components;
  layouts: LayoutDesc<Layout[]>;
  cols: LayoutDesc<number>;
}
