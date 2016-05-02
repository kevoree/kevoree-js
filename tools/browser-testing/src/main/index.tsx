import 'font-awesome/css/font-awesome.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Index } from './components/index/Index';
import { Registry } from './utils/Registry';

let app = ReactDOM.render(
  <Index />,
  document.getElementById('container')) as Index;

class RegistryImpl implements Registry {

  register(name: string, type: any) {
    app.init(name, type);
    app.forceUpdate();
  }

  get(name: string): any {
    return null;
  }

  getAll(): any[] {
    return [];
  }
}

// global registry
(window as any).KevoreeBrowserRegistry = new RegistryImpl();
