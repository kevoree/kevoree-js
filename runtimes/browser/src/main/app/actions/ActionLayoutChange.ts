import { Layout } from 'react-grid-layout';
import { Action } from './Action';
import { LayoutDesc } from '../api';

export interface ActionLayoutChange extends Action {
  breakpoint: string;
  layouts: Layout[];
}
