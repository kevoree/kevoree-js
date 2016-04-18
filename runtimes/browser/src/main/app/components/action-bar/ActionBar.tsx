import './action-bar.css';

import * as React from 'react';
import * as classNames from 'classnames';

interface IAction {
  handler: Function;
  helper?: string;
}

interface ActionBarProps {
  children?: IAction[]
}
interface ActionBarState {
  showHelper: boolean;
  helper: string;
}

export class ActionBar extends React.Component<ActionBarProps, ActionBarState> {
  constructor(props: ActionBarProps) {
    super(props);
    this.state = { showHelper: false, helper: '' };
  }

  onShowHelper(action: React.ReactElement<ActionProps>) {
    this.setState({ showHelper: true, helper: action.props.helper });
  }

  onHideHelper(action: React.ReactElement<ActionProps>) {
    this.setState({ showHelper: false, helper: '' });
  }

  render(): JSX.Element {
    return (
      <div className="action-bar">
        {this.props.children.map((child, i) => {
          return (
            <div key={i} className="action">
              <ActionWrapper
                  onShowHelper={this.onShowHelper.bind(this)}
                  onHideHelper={this.onHideHelper.bind(this)}>
                {child}
              </ActionWrapper>
            </div>
          )
        })}
        <div className={classNames('helper', { hide: !this.state.showHelper })}>
          {this.state.helper}
        </div>
      </div>
    );
  }
}

interface ActionWrapperProps {
  onShowHelper: (action: React.ReactElement<ActionProps>) => void;
  onHideHelper: (action: React.ReactElement<ActionProps>) => void;
}
class ActionWrapper extends React.Component<ActionWrapperProps, void> {
  render(): JSX.Element {
    return (
      <div
          onMouseEnter={this.props.onShowHelper.bind(this, this.props.children)}
          onMouseLeave={this.props.onHideHelper.bind(this, this.props.children)}
          onFocus={this.props.onShowHelper.bind(this, this.props.children)}
          onBlur={this.props.onHideHelper.bind(this, this.props.children)}>
        {this.props.children}
      </div>
    );
  }
}

interface ActionProps extends IAction {}
export class Action extends React.Component<ActionProps, void> {

  onClick(event: MouseEvent) {
    event.preventDefault();
    this.props.handler();
    (event.target as any).blur();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.handler();
      (event.target as any).blur();
    }
  }

  render(): JSX.Element {
    return (
      <button
          onClick={this.onClick.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}
