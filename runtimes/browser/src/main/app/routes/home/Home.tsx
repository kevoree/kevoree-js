import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AbstractComponent } from '../../components/AbstractComponent';

export interface RouteParams {}
interface UIProps extends RouteComponentProps<RouteParams, {}> {}
export class Home extends AbstractComponent<UIProps, {}> {
  render(): JSX.Element {
    return (
      <div className="container">
        <h4>TODO</h4>
      </div>
    );
  }
}
