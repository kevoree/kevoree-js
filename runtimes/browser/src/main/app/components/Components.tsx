import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { browserHistory } from 'react-router';
import { NavLink } from '../util/NavLink';

export interface RouteParams {}

export class Components extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {

  handleSubmit(event: Event) {
    event.preventDefault();
    (this.context as any).router.push(`/components/${(event.target as any).elements[0].value}`);
  }

  render(): JSX.Element {
    return (
      <div>
        <ul>
          <li><NavLink to="/components/comp0">comp0</NavLink></li>
          <li><NavLink to="/components/comp1">comp1</NavLink></li>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="name" />{' '}
              <button type="submit">Find</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
