import * as React from 'react';
import { Observer } from 'kevoree-ui';

export interface UIProps {
  onTick: Observer<string>;
}
export interface UIState {
  lastTick: string;
  count: number;
}

export class TickerUI extends React.Component<UIProps, UIState> {

  constructor(props: UIProps, ctx?: void) {
    super(props);
    props.onTick.on(tick => {
      this.setState({ lastTick: tick, count: ++this.state.count });
    });
    this.state = { lastTick: null, count: 0 };
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          <strong>Last tick:</strong>
          <em style={{ float: 'right' }}>{this.state.lastTick}</em>
        </div>
        <div>
          <strong>Number of ticks:</strong>
          <em style={{ float: 'right' }}>{this.state.count}</em>
        </div>
      </div>
    );
  }
}
