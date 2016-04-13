import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface RouteParams {}

export class Settings extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {
  render() {
    return <div>settings</div>;
  }
}
