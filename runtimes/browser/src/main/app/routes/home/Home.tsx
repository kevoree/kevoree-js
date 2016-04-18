import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReactComponent } from '../../util/ReactComponent';

export interface RouteParams {}
interface UIProps extends RouteComponentProps<RouteParams, {}> {}
export class Home extends ReactComponent<UIProps, {}> {
  render(): JSX.Element {
    return (
      <div className="container"></div>
    );
  }
}
