import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Home } from './home/Home';
import { NavLink } from './util/NavLink';

export interface RouteParams {}

export class App extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {
  render() {
    return (
      <div>
        <h3>Kevoree Browser Runtime</h3>
        <div className="menu">
          <NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/components">Components</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </div>
        {this.props.children || <Home />}
      </div>
    );
  }
};
