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
import { Layout } from 'react-grid-layout';
import { App } from './app/App';
import { Home } from './app/routes/home/Home';
import { Dashboard } from './app/routes/dashboard/Dashboard';
import { Settings } from './app/routes/settings/Settings';
import { Component } from './app/api/Component';
import { LayoutDesc } from './app/api/LayoutDesc';
import { RootStore } from './app/stores';

function genRandomComponents(): Component[] {
  var components: Component[] = [];
  const max = 10, min = 3;
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  for (var i=0; i < count; i++) {
    components.push({
      name: 'comp' + i,
      type: ['AsyncWebSocketConsolePrinter', 'ConsolePrinter', 'Chart'][(Math.floor(Math.random() * 3))],
      hide: false
    });
  }
  return components;
}

const store: RootStore = {
  components: genRandomComponents(),
  layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
};

const onLayoutChange = (layout: Layout, layouts: LayoutDesc<Layout[]>) => {
  store.layouts = layouts;
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="/dashboard" component={props => <Dashboard layouts={store.layouts} onLayoutChange={onLayoutChange} components={store.components} />} />
      <Route path="/settings" component={Settings} />
    </Route>
  </Router>,
  document.getElementById('app'));
