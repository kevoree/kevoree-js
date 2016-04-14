import { Component } from '../api/Component';
import { LayoutDesc } from '../api/LayoutDesc';
import { Layout } from 'react-grid-layout';

export interface RootStore {
  components: Component[];
  layouts: LayoutDesc<Layout[]>;
}
