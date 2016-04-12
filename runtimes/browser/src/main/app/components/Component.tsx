import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface RouteParams {
  name: string;
}

export class Component extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {
  render() {
    return (
      <div>
        <h4>Component: {this.props.params.name}</h4>
      </div>
    );
  }
}
