import * as React from 'react';
import * as Radium from 'radium';
import { Button } from '../Button';
import styles from './styles';

interface ActionProps {
  handler: Function;
  helper?: string;
}

interface ActionBarProps {
  children?: ActionProps[];
}
interface ActionBarState {
  showHelper: boolean;
  helper: string;
}

@Radium
export class ActionBar extends React.Component<ActionBarProps, ActionBarState> {
  constructor(props: ActionBarProps) {
    super(props);
    this.state = { showHelper: false || false, helper: '' };
  }

  onShowHelper(action: React.ReactElement<ActionProps>) {
    this.setState({ showHelper: true, helper: action.props.helper });
  }

  onHideHelper(action: React.ReactElement<ActionProps>) {
    this.setState({ showHelper: false, helper: '' });
  }

  render(): JSX.Element {
    return (
      <div style={styles.bar}>
        {this.props.children.map((child, i) => {
          return (
            <div key={i} style={styles.action}>
              <div
                  onMouseEnter={this.onShowHelper.bind(this, child)}
                  onFocus={this.onShowHelper.bind(this, child)}
                  onMouseLeave={this.onHideHelper.bind(this, child)}
                  onBlur={this.onHideHelper.bind(this, child)}>
                {child}
              </div>
            </div>
          )
        })}
        <div style={[styles.helper, !this.state.showHelper && styles.hide ]}>
          {this.state.helper}
        </div>
      </div>
    );
  }
}

@Radium
export class Action extends React.Component<ActionProps, void> {

  render(): JSX.Element {
    return (
      <Button
          style={styles.button}
          handler={this.props.handler}>
        {this.props.children}
      </Button>
    );
  }
}
