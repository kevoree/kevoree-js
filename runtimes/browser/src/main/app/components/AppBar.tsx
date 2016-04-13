import * as React from 'react';
import { NavLink } from './NavLink';

interface UIState {
  open: boolean;
}

export class AppBar extends React.Component<{}, UIState> {

  constructor(props: {}) {
    super(props);
    this.state = { open: false };
  }

  render(): JSX.Element {
    const respName = this.state.open ? 'Close' : 'Open';

    return (
      <div className="app-bar">
        <div className="menu-responsive">
            <button className="small"><span className="fa fa-bars"></span>&nbsp;{respName}</button>
        </div>
        <div className="menu">
          <div className="logo">
            <img src="images/logo.png" />
          </div>
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
        <div className="menu menu-right">
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
