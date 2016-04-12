import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './app/App';
import { Home } from './app/home/Home';
import { Dashboard } from './app/dashboard/Dashboard';
import { Settings } from './app/settings/Settings';
import { Components } from './app/components/Components';
import { Component } from './app/components/Component';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/components" component={Components}>
        <Route path="/components/:name" component={Component} />
      </Route>
      <Route path="/settings" component={Settings} />
    </Route>
  </Router>,
  document.getElementById('app'));
