import * as React from 'react';
import { Link } from 'react-router';

export class NavLink extends React.Component<any, any> {
  render(): JSX.Element {
    return <Link {...this.props} activeClassName="active"></Link>;
  }
}
