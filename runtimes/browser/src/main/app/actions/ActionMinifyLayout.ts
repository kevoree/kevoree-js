import { Action } from './Action';
import { LayoutDesc } from '../api';

export interface ActionMinifyLayout extends Action {
  breakpoint: string;
  cols: LayoutDesc<number>;
}
