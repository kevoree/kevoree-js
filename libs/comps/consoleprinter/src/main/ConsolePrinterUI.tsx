import * as React from 'react';
import { Observer } from 'kevoree-api';
import ConsolePrinter = require('./ConsolePrinter');

export interface UIProps {
  onMessage: Observer<string>;
}

export interface UIState {
  messages?: string[];
  limit?: number;
}

export class ConsolePrinterUI extends React.Component<UIProps, UIState> {
  constructor(props: UIProps, ctx?: {}) {
    super(props);
    props.onMessage.on(msg => {
      if (this.state.messages.length >= this.state.limit) {
        this.state.messages.splice(0, (this.state.messages.length - this.state.limit) + 1);
      }
      this.state.messages.push(msg);
      this.setState({ messages: this.state.messages });
    });
    this.state = { messages: [], limit: 5 };
  }

  onClear() {
    this.setState({ messages: [] });
  }

  onChange(e: Event) {
    const limit = parseInt((e.target as any).value, 10);
    if (this.state.messages.length >= limit) {
      this.state.messages.splice(0, (this.state.messages.length - this.state.limit) + 1);
    }
    this.setState({ messages: this.state.messages, limit: limit });
  }

  render(): JSX.Element {
    return (
      <div>
        <button onClick={this.onClear.bind(this)}>Clear</button>
        <input type="number" min="1" value={this.state.limit} onChange={this.onChange.bind(this)} style={{ width: '100px', marginLeft: '5px' }} />
        <ul>
          {this.state.messages.map((str, i) => {
            return <li key={i}>{str}</li>;
          })}
        </ul>
      </div>
    );
  }
}
