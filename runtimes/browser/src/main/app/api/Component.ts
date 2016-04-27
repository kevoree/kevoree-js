import { Layout } from 'react-grid-layout';
import { LayoutDesc } from './LayoutDesc';

export interface Component {
  name: string;
  type: string;
  hide: boolean;
  layouts: LayoutDesc<Layout>;
}

export class Components {
  [name: string]: Component;
}
