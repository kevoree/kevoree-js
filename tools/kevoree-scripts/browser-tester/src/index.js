import React from 'react';
import ReactDOM from 'react-dom';
import ErrorUI from './components/Error';
import App from './components/App';

const params = decodeURI(window.location.search.substr(1))
  .split('&')
  .reduce((params, value) => {
    const array = value.split('=');
    params[array[0]] = array[1];
    return params;
  }, {
    model: 'kevlib.json',
    script: 'kevs/main.kevs'
  });

const root = document.getElementById('root');

fetch(`http://localhost:8080/app/${params.model}`)
  .then((res) => {
    return res.json();
  }, () => {
    throw new Error(`Kevoree Browser Tester needs "${params.model}". Build your project with <pre><code>npm run build</code></pre> and refresh the page.`);
  })
  .then((model) => {
    return fetch(`http://localhost:8080/app/${params.script}`)
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        }
        throw new Error(`Unable to find the KevScript file at "${params.script}"`);
      }, () => {
        throw new Error(`Kevoree Browser Tester needs a KevScript at "${params.script}". Create one and refresh the page.`);
      })
      .then((script) => ({ model, script }));
  })
  .then((params) => {
    ReactDOM.render((
      <ErrorUI>
        <App {...params} />
      </ErrorUI>
    ), root);
  })
  .catch((err) => {
    ReactDOM.render((
      <div className="container">
        <div className="header">
          <h2>Kevoree Browser Tester</h2>
        </div>
        <ErrorUI error={err} />
      </div>
    ), root);
  });
