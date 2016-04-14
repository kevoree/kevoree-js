import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Home } from './routes/home/Home';
import { AppBar } from './components/app-bar/AppBar';
import { Component } from './api/Component';

export interface RouteParams {}
export interface UIProps extends RouteComponentProps<RouteParams, {}> {}
interface UIState {}

export class App extends React.Component<UIProps, UIState> {
  constructor(props: UIProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-container">
        <AppBar />
        <div className="route-container">
          {this.props.children || <Home />}
        </div>
      </div>
    );
  }
};
