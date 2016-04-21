import { Action } from './Action';
import { LayoutDesc } from '../api';

export interface ActionArrangeLayout extends Action {
  breakpoint: string;
  cols: LayoutDesc<number>;
}
