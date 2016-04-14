import './app-bar.css';

import * as React from 'react';
import { NavLink } from '../NavLink';
import * as classnames from 'classnames';

interface UIState {
  open: boolean;
}

export class AppBar extends React.Component<{}, UIState> {

  constructor(props: {}) {
    super(props);
    this.state = { open: false };
  }

  toggleMenuClick(event: MouseEvent) {
    event.preventDefault();
    this.setState({ open: !this.state.open });
  }

  toggleMenuKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.setState({ open: !this.state.open });
    }
  }

  render(): JSX.Element {
    const btnLabel = this.state.open ? 'Close' : 'Open';

    return (
      <div className="app-bar">
        <div className="logo">
          <img src="images/logo.png" />
        </div>
        <div className="menu-responsive">
            <button className="medium" onClick={this.toggleMenuClick.bind(this)}
                onKeyDown={this.toggleMenuKey.bind(this)}>
              <span className="fa fa-bars"></span>
              &nbsp;{btnLabel}
            </button>
        </div>
        <div className={classnames('menu', { open: this.state.open })}>
          <div>
            <NavLink to="/" onlyActiveOnIndex={true}>
              <span className="fa fa-home"></span>
              &nbsp;Home
            </NavLink>
          </div>
          <div>
            <NavLink to="/dashboard">
              <span className="fa fa-th"></span>
              &nbsp;Dashboard
            </NavLink>
          </div>
        </div>
        <div className={classnames('menu', 'menu-right', { open: this.state.open })}>
          <div>
            <NavLink to="/settings">
              <span className="fa fa-cog"></span>
              &nbsp;Settings
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
