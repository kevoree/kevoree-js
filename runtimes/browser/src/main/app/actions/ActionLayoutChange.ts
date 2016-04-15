import { Layout } from 'react-grid-layout';
import { Action } from './Action';
import { Actions } from './Actions';
import { LayoutDesc } from '../api';

export class ActionLayoutChange implements Action {
  type = Actions.LAYOUT_CHANGE;
  layouts: LayoutDesc<Layout[]>;
}
