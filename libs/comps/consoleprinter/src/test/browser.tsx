import { Services, Injector, Context, LoggerFactory } from 'kevoree-api';
import { ModelServiceImpl } from './ModelServiceImpl';
import { ContextServiceImpl } from './ContextServiceImpl';
import { OutputPortImpl } from './OutputPortImpl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ConsolePrinter = require('../main/ConsolePrinter');

interface UIState {
  instance: ConsolePrinter
}

class Browser extends React.Component<{}, UIState> {

  private injector: Injector;
  private count: number = 0;
  private msgCount: number = 0;

  constructor() {
    super();
    this.state = { instance: null };

    // create an injector
    this.injector = new Injector();
    // add the model service on it
    var modelService = new ModelServiceImpl();
    this.injector.register(Services.Model, modelService);
  }

  createInstance() {
    if (this.state.instance === null) {
      // create an instance
      const instance = new ConsolePrinter();

      // contextual injector for the instance
      var ctx = new Context();
      ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
      ctx.register(Services.Context, new ContextServiceImpl(`comp${this.count++}`, 'node0'));

      // inject services in instance
      this.injector.inject(instance, ctx);

      this.setState({ instance: instance });
    }
  }

  removeInstance() {
    this.setState({ instance: null });
  }

  sendMsg() {
    if (this.state.instance) {
      this.state.instance.input(`${parseInt(`${Math.random()*100}`, 10)}`);
    }
  }

  sendIncMsg() {
    if (this.state.instance) {
      this.state.instance.input(`${this.msgCount++}`);
    }
  }

  render(): JSX.Element {
    var instance = <em>Not loaded yet</em>;
    if (this.state.instance) {
      instance = this.state.instance.render();
    }

    return (
      <div>
        <h2>Browser test: ConsolePrinter</h2>
        <div>
          <button onClick={this.createInstance.bind(this)} disabled={this.state.instance !== null}>Create instance</button>
          <button onClick={this.removeInstance.bind(this)} disabled={this.state.instance === null}>Remove instance</button>
          <button onClick={this.sendMsg.bind(this)} disabled={this.state.instance === null}>Send random msg</button>
          <button onClick={this.sendIncMsg.bind(this)} disabled={this.state.instance === null}>Send inc msg</button>
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
