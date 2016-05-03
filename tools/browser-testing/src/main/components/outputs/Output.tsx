import * as React from 'react';

interface UIProps {
  name: string;
  messages: string[];
}

export class Output extends React.Component<UIProps, void> {
  render(): JSX.Element {
    if (this.props.messages.length === 0) {
      return (<div></div>);
    } else {
      return (
        <fieldset style={{ float: 'left' }}>
          <legend>{this.props.name}</legend>
          <ul style={{ maxHeight: 400, overflow: 'auto', listStyleType: 'none', paddingLeft: 0, paddingRight: 25 }}>
            {this.props.messages.map(
              (msg, i) => (<li key={i}>{msg}</li>)
            )}
          </ul>
        </fieldset>
      );
    }
  }
}
