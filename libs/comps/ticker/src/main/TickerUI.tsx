import * as React from 'react';
import { Observer } from 'kevoree-ui';

export interface UIProps {
  onTick: Observer<string>;
}
export interface UIState {
  lastTick: string;
}

export class TickerUI extends React.Component<UIProps, UIState> {

  constructor(props: UIProps, ctx?: void) {
    super(props);
    props.onTick.on(tick => {
      this.setState({ lastTick: tick });
    });
    this.state = { lastTick: null };
  }

  render(): JSX.Element {
    return (
      <div>
        <strong>Last tick:</strong>
        <em>{this.state.lastTick}</em>
      </div>
    );
  }
}
