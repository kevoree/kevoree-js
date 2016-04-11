import { Services, Injector, Context, LoggerFactory } from 'kevoree-api';
import { UIProcessor } from 'kevoree-ui';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Ticker = require('../main/Ticker');

interface UIState {
  instance?: Ticker;
  started?: boolean;
}

class Browser extends React.Component<{}, UIState> {

  private injector: Injector;
  private count: number = 0;
  private msgCount: number = 0;

  constructor() {
    super();
    this.state = { instance: null, started: false };

    // create an injector
    this.injector = new Injector();
    // add the model service on it
    var modelService = new ModelServiceImpl();
    this.injector.register(Services.Model, modelService);
  }

  createInstance() {
    if (this.state.instance === null) {
      // create an instance
      const instance = new Ticker();

      // contextual injector for the instance
      var ctx = new Context();
      ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
      ctx.register(Services.Context, new ContextServiceImpl(`comp${this.count++}`, 'node0'));

      // create an instance
      instance['delay'] = 500;
      instance['random'] = false;
      instance['tick'] = new OutputPortImpl();

      // inject services in instance
      this.injector.inject(instance, ctx);

      this.setState({ instance: instance, started: false });
    }
  }

  startInstance() {
    if (this.state.instance !== null && !this.state.started) {
      this.state.instance.start();
      this.setState({ started: true });
    }
  }

  stopInstance() {
    if (this.state.instance !== null && this.state.started) {
      this.state.instance.stop();
      this.setState({ started: false });
    }
  }

  removeInstance() {
    this.stopInstance();
    this.setState({ instance: null });
  }

  render(): JSX.Element {
    var instance = <em>Not loaded yet</em>;
    if (this.state.instance) {
      instance = UIProcessor.render(this.state.instance);
    }

    return (
      <div>
        <h2>Browser test: Ticker</h2>
        <div>
          <button onClick={this.createInstance.bind(this)} disabled={this.state.instance !== null}>Create instance</button>
          <button onClick={this.startInstance.bind(this)} disabled={this.state.instance === null || this.state.started === true}>Start instance</button>
          <button onClick={this.stopInstance.bind(this)} disabled={this.state.instance === null || this.state.started === false}>Stop instance</button>
          <button onClick={this.removeInstance.bind(this)} disabled={this.state.instance === null}>Remove instance</button>
        </div>
        <div style={{ marginTop: '10px', padding: '3px', border: '1px solid', width: '200px' }}>
          {instance}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Browser />,
  document.getElementById('container')
)
