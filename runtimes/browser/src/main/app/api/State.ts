import { Layout } from 'react-grid-layout';
import { Components, LayoutDesc } from './index';

export interface State {
  components: Components;
  layouts: LayoutDesc<Layout[]>;
  cols: LayoutDesc<number>;
}
