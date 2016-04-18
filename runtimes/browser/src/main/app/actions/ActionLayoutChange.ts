import { Layout } from 'react-grid-layout';
import { Action } from './Action';
import { Actions } from './Actions';
import { LayoutDesc } from '../api';

export interface ActionLayoutChange extends Action {
  layouts: LayoutDesc<Layout[]>;
}
