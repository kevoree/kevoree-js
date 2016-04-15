import { Store } from 'redux';
import { Action } from '../actions/Action';
import { State } from './State';

export interface Context {
  store: Store<State, Action>
}
