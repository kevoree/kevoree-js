import * as React from 'react';
import * as Radium from 'radium';
import { AbstractComponent } from '../AbstractComponent';
import { Button } from '../Button';
import { NavLink } from '../NavLink';
import { Actions, ActionToggleAppBar } from '../../actions';
import styles from './styles';

@Radium
export class AppBar extends AbstractComponent<void, void> {

  toggle() {
    const newState = !this.context.store.getState().appbar.open;
    this.context.store.dispatch<ActionToggleAppBar>({
      type: Actions.TOGGLE_APP_BAR, open: newState
    });
  }

  toggleMenuClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
    (event.target as any).blur();
  }

  toggleMenuKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.toggle();
      (event.target as any).blur();
    }
  }

  render(): JSX.Element {
    const appBar = this.context.store.getState().appbar;
    const btnLabel = appBar.open ? 'Close' : 'Open';

    return (
      <div style={styles.bar}>
        <div style={styles.logo}>
          <img src="images/logo.png" style={styles.logoImg} />
        </div>
        <div style={styles.menuResponsive}>
            <Button
                displaySize='medium'
                style={styles.menuResponsiveBtn}
                handler={this.toggle.bind(this)}>
              <span className="fa fa-bars"></span>
              &nbsp;{btnLabel}
            </Button>
        </div>
        <div style={[styles.menu, appBar.open && styles.open]}>
          <div style={styles.menuChild}>
            <NavLink
                to="/"
                onlyActiveOnIndex={true}
                style={styles.link}
                activeStyle={styles.activeLink}>
              <span className="fa fa-home"></span>
              &nbsp;Home
            </NavLink>
          </div>
          <div style={styles.menuChild}>
            <NavLink
                to="/dashboard"
                onlyActiveOnIndex={true}
                style={styles.link}
                activeStyle={styles.activeLink}>
              <span className="fa fa-th"></span>
              &nbsp;Dashboard
            </NavLink>
          </div>
        </div>
        <div style={[
                styles.menu,
                styles.rightMenu,
                appBar.open && styles.open
              ]}>
          <div style={[styles.menuChild, styles.rightMenuChild]}>
            <NavLink
                to="/settings"
                onlyActiveOnIndex={true}
                style={styles.link}
                activeStyle={styles.activeLink}>
              <span className="fa fa-cog"></span>
              &nbsp;Settings
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
