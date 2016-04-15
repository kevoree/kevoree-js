import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReactComponent } from '../../util/ReactComponent';

export interface RouteParams {}
interface UIProps extends RouteComponentProps<RouteParams, {}> {}
export class Home extends ReactComponent<UIProps, {}> {
  render(): JSX.Element {
    const state = this.context.store.getState();

    return (
      <div className="container">
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div>
    );
  }
}
