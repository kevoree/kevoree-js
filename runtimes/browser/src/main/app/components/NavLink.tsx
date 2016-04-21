import * as React from 'react';
import { Link } from 'react-router';
import * as Radium from 'radium';

const RLink = Radium(Link);

export class NavLink extends React.Component<any, any> {
  render(): JSX.Element {
    return <RLink {...this.props} activeClassName="active" />;
  }
}
