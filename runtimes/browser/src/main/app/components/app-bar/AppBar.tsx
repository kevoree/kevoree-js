import './app-bar.css';

import * as React from 'react';
import * as classnames from 'classnames';
import { AbstractComponent } from '../AbstractComponent';
import { NavLink } from '../NavLink';
import { Actions, ActionToggleAppBar } from '../../actions';

export interface UIProps {}

export class AppBar extends AbstractComponent<UIProps, {}> {

  toggle() {
    const newState = !this.context.store.getState().appbar.open;
    this.context.store.dispatch<ActionToggleAppBar>({
      type: Actions.TOGGLE_APP_BAR, open: newState
    });
  }

  toggleMenuClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
  }

  toggleMenuKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.toggle();
    }
  }

  render(): JSX.Element {
    const appBar = this.context.store.getState().appbar;
    const btnLabel = appBar.open ? 'Close' : 'Open';

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
        <div className={classnames('menu', { open: appBar.open })}>
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
        <div className={classnames('menu', 'menu-right', { open: appBar.open })}>
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
