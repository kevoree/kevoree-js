import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface RouteParams {}

export class Home extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {
  render() {
    return <div>home</div>;
  }
}
