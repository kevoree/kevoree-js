// third-party styles
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'font-awesome/css/font-awesome.css';
import '../../styles/main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './app/App';
import { Home } from './app/routes/home/Home';
import { Dashboard } from './app/routes/dashboard/Dashboard';
import { Settings } from './app/routes/settings/Settings';
import { Component } from './app/api/Component';

function genRandomComponents(): Component[] {
  var components: Component[] = [];
  const max = 10, min = 1;
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  for (var i=0; i < count; i++) {
    components.push({
      name: 'comp' + i
    });
  }
  return components;
}

const comps = genRandomComponents();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="/dashboard" component={props => <Dashboard components={comps} />} />
      <Route path="/settings" component={Settings} />
    </Route>
  </Router>,
  document.getElementById('app'));
