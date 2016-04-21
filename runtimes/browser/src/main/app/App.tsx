import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Radium from 'radium';
import { Home } from './routes/home/Home';
import { AppBar } from './components/app-bar/AppBar';
import { Context } from './api';

export interface RouteParams {}
export interface UIProps extends RouteComponentProps<RouteParams, {}> {}
interface UIState {}

export class App extends React.Component<UIProps, UIState> {
  render() {
    return (
      <Radium.StyleRoot>
        <div className="app-container">
          <AppBar />
          <div className="route-container">
            {this.props.children || <Home />}
          </div>
        </div>
      </Radium.StyleRoot>
    );
  }
};
