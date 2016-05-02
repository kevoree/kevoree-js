import * as React from 'react';
import { ReflectUtils } from 'kevoree-reflect-utils';
import styles from './styles';

interface UIProps {
  instance?: any;
  started: boolean;
}

interface UIState {
  messages: { [key:string]: string };
}

export class Inputs extends React.Component<UIProps, UIState> {

  constructor(props: UIProps) {
    super(props);
    this.state = { messages: {} };
  }

  onChange(portName: string, event: Event) {
    this.state.messages[portName] = (event.target as any).value;
    this.setState({ messages: this.state.messages });
  }

  onKeyDown(portName: string, event: KeyboardEvent) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      this.doSend(portName);
    }
  }

  doSend(portName: string) {
    this.props.instance[portName](this.state.messages[portName]);
    this.state.messages[portName] = '';
    this.setState({ messages: this.state.messages });
  }

  render(): JSX.Element {
    let inputs = [];
    if (this.props.instance) {
      inputs = ReflectUtils.getInputs(this.props.instance).map((name, i) => {
        return (
          <li key={i} style={styles.listItem}>
            <label for={name} style={styles.label}>{name}</label>
            <input
                name={name}
                type='text'
                value={this.state.messages[name]}
                onChange={this.onChange.bind(this, name)}
                onKeyDown={this.onKeyDown.bind(this, name)}
                disabled={!this.props.started}
                style={styles.input} />
            <button
                onClick={this.doSend.bind(this, name)}
                onKeyDown={this.onKeyDown.bind(this, name)}
                disabled={!this.props.started}>
              Send
            </button>
          </li>
        );
      });
    }

    return (
      <fieldset style={styles.fieldset(inputs.length > 0)}>
        <legend style={styles.legend}>Inputs</legend>
        <ul style={styles.list}>
          {inputs}
        </ul>
      </fieldset>
    );
  }
}
