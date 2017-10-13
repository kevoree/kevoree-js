import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import KevScript from 'kevoree-kevscript';
import TinyConf from 'tiny-conf';
import kevoree from 'kevoree-library';
import KevoreeCore from 'kevoree-core';

import Sidebar from './component/Sidebar';

import Home from './page/Home';
import Settings from './page/Settings';
import Editor from './page/Editor';

import loggerFactory from './lib/logger-factory';
import Resolver from './lib/resolver';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    // initialize the Kevoree stuff
    TinyConf.set({
      registry: {
        host: 'registry.kevoree.org',
        port: 443,
        ssl: true
      }
    });
    this.factory = new kevoree.factory.DefaultKevoreeFactory();
    const resolver = new Resolver(loggerFactory.create('Resolver'));
    this.kevs = new KevScript(loggerFactory.create('KevScript'));
    this.core = new KevoreeCore(resolver, this.kevs, loggerFactory);
  }

  componentDidMount() {
    this.core.start(this.props.name);
    this.kevs.parse(`add ${this.props.name}: ${this.props.type}`)
      .then(({ model }) => this.core.deploy(model))
      .then(() => console.log('Started'))
      .catch((err) => console.error(err.stack));
  }

  render() {
    const homeProps = {
      core: this.core,
      name: this.props.name,
      type: this.props.type
    };
    const editorProps = {
      kevs: this.kevs,
      getModel: () => {
        let model = this.core.getCurrentModel();
        if (!model) {
          model = this.factory.createContainerRoot();
          this.factory.root(model);
        }
        return model;
      }
    };
    const settingsProps = {};

    const routes = [
      {
        name: 'Home',
        path: '/',
        exact: true,
        component: () => <Home {...homeProps} />,
        icon: 'home'
      },
      {
        name: 'KevScript',
        path: '/editor',
        component: () => <Editor {...editorProps} />,
      icon: 'terminal'
      },
      {
        name: 'Settings',
        path: '/settings',
        component: () => <Settings {...settingsProps} />,
        icon: 'cogs'
      },
    ];

    return (
      <BrowserRouter>
        <div className="App-container">
          <Sidebar routes={routes} />
          <div className="App-content">
            {routes.map((route, i) => <Route key={i} {...route} />)}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
