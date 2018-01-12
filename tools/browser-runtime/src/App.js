import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TinyConf from 'tiny-conf';
import kevoree from 'kevoree-library';

import Sidebar from './component/Sidebar';
import Loading from './component/Loading';

import Home from './page/Home';
import Settings from './page/Settings';
import Editor from './page/Editor';
import Logger from './page/Logger';

import CoreService from './service/core';
import LoggerService from './service/logger';
import InstanceService from './service/instance';
import ResolverService from './service/resolver';
import KevScriptService from './service/kevscript';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    TinyConf.set({
      registry: {
        host: 'registry.kevoree.org',
        port: 443,
        ssl: true
      }
    });

    const defaultScript = `// this is an example of KevScript
add ${props.name}.sender: MsgSender
add ${props.name}.printer: ConsolePrinter
add chan: LocalChannel

bind ${props.name}.sender.send chan
bind ${props.name}.printer.input chan`;

    const logger = new LoggerService();
    const kevs = new KevScriptService(logger, defaultScript);
    const resolver = new ResolverService(logger);
    const instances = new InstanceService();
    global.KevoreeInstanceLoader = instances;
    const core = new CoreService(resolver, kevs, logger, instances);
    this.services = { logger, resolver, kevs, core };

    this.state = { started: false };
  }

  componentDidMount() {
    const logger = this.services.logger.create('Runtime');
    logger.info('My Msg', { tag: 'MYTAG' });
    this.factory = new kevoree.factory.DefaultKevoreeFactory();
    this.services.core.start(this.props.name);
    this.services.kevs.parse(`add ${this.props.name}: ${this.props.type}`)
      .then(({ model }) => this.services.core.deploy(model))
      .then(() => this.setState({ started: true }))
      .catch((err) => {
        logger.error(err.stack);
        this.setState({ error: err });
      });
  }

  render() {
    if (this.state.started) {
      const homeProps = {
        services: this.services,
        nodeName: this.props.name,
        nodeType: this.props.type
      };
      const editorProps = {
        services: this.services,
        getModel: () => {
          let model = this.services.core.getCurrentModel();
          if (!model) {
            model = this.factory.createContainerRoot();
            this.factory.root(model);
          }
          return model;
        }
      };
      const loggerProps = {
        services: this.services,
      };
      const settingsProps = {
        services: this.services,
      };
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
          name: 'Logger',
          path: '/logger',
          component: () => <Logger {...loggerProps} />,
          icon: 'browser'
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
    } else if (this.state.error) {
      return (
        <Loading
          type='error'
          title='Something went wrong'
          msg={<span>Your Kevoree Browser Runtime failed to load.<br/>We are sorry for the inconvenience. <a href="/">Reload</a></span>}
          icon='warning sign' />
      );
    } else {
      return (
        <Loading
          title='Just one second'
          msg='Your Kevoree Browser Runtime is loading...'
          icon='circle notched' />
      );
    }
  }
}
