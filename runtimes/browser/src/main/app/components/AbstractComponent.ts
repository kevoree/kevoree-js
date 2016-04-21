import * as React from 'react';
import { Context, State } from '../api';

export abstract class AbstractComponent<P, S> extends React.Component<P, S> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object.isRequired
  }

  context: Context;
  protected unsubscribe: Function;

  constructor(props: P, context: Context) {
    super(props, context);
  }

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}
