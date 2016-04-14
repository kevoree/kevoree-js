import * as React from 'react';
import { Component } from '../api/Component';

export interface UIProps extends Component {}
interface UIState {}

export class Tile extends React.Component<UIProps, UIState> {
  constructor(props: UIProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    return (
      <div className="tile">
        <div className="header">{this.props.name}</div>
        <div className="content"></div>
      </div>
    );
  }
}
