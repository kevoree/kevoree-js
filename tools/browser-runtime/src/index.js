import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { capitalize, randomId } from './lib/util';

import './theme.css';
import './index.css';


const params = decodeURI(window.location.search.substr(1))
  .split('&')
  .reduce((params, value) => {
    const array = value.split('=');
    params[array[0]] = array[1];
    return params;
  }, {});

ReactDOM.render(
  <App name={params.name || `browser${capitalize(randomId())}`} type={params.type || 'JavascriptNode'} />,
  document.getElementById('root')
);

registerServiceWorker();
