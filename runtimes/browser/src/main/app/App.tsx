import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Home } from './routes/home/Home';
import { AppBar } from './components/AppBar';

export interface RouteParams {}

export class App extends React.Component<RouteComponentProps<RouteParams, {}>, {}> {
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
