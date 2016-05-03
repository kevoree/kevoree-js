import * as React from 'react';
import { ReflectUtils } from 'kevoree-api';
import { Output } from './Output';
import styles from './styles';

interface UIProps {
  outputs: { [key:string]: string[] };
}

export class Outputs extends React.Component<UIProps, void> {

  render(): JSX.Element {
    return (
      <fieldset>
        <legend style={{ fontWeight: 'bold' }}>Outputs</legend>
        {Object.keys(this.props.outputs).map((key, i) => {
          const item = { name: key, messages: this.props.outputs[key] };
          return (<Output key={i} name={item.name} messages={item.messages} />);
        })}
      </fieldset>
    );
  }
}
