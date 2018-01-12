import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { capitalize, randomId, queryparams } from './lib/util';

import './theme.css';
import './index.css';

global.React = React;
global.ReactDOM = ReactDOM;

const params = queryparams();

ReactDOM.render(
  <App
    name={params.name || `browser${capitalize(randomId())}`}
    type={params.type || 'JavascriptNode'} />,
  document.getElementById('root')
);
