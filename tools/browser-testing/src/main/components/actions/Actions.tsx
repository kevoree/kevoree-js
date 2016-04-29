import * as React from 'react';
import styles from './styles';

export interface Action {
  enabled: boolean;
  handler: () => void;
}

interface UIProps {
  actions: { [name:string]: Action };
}

export class Actions extends React.Component<UIProps, void> {
  render(): JSX.Element {
    return (
      <div>
        {Object.keys(this.props.actions).map((name, i) => {
          const item = this.props.actions[name];
          return (
            <button
                key={i}
                onClick={item.handler}
                disabled={!item.enabled}>
              {name}
            </button>
          );
        })}
      </div>
    );
  }
}
