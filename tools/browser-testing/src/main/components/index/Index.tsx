import 'whatwg-fetch';
import * as React from 'react';
import { Services, Injector, Context, LoggerFactory } from 'kevoree-api';
import { UIProcessor } from 'kevoree-ui';
import { ReflectUtils } from 'kevoree-reflect-utils';
import { LifecycleActions } from '../lifecycle-actions/LifecycleActions';
import { ModelServiceImpl } from '../../services/ModelServiceImpl';
import { ContextServiceImpl } from '../../services/ContextServiceImpl';
import { URLUtils } from '../../utils/URLUtils';
import styles from './styles';

interface UIState {
  started?: boolean;
  ui?: React.ReactElement<any>;
  instance?: any;
}

export class Index extends React.Component<void, UIState>  {

  private injector: Injector;
  private compType: string;

  constructor(props: void) {
    super(props);
    this.state = { started: false, ui: null, instance: null };

    this.compType = URLUtils.getParamByName('name');

    // create an injector
    this.injector = new Injector();
    // add the model service on it
    var modelService = new ModelServiceImpl();
    this.injector.register(Services.Model, modelService);
  }

  createInstance() {
    console.log('onCreate');
    if (this.state.instance === null) {
      // create an instance
      const CompType = window[this.compType];
      const instance = new CompType();

      // contextual injector for the instance
      var ctx = new Context();
      ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
      ctx.register(Services.Context, new ContextServiceImpl('yourComp', 'node0'));

      // inject services in instance
      this.injector.inject(instance, ctx);

      this.setState({
        instance: instance,
        ui: UIProcessor.render(instance),
        started: false
      });

      console.log('created', instance);
    }
  }

  removeInstance() {
    console.log('onRemove');
    this.stopInstance();
    this.setState({ instance: null, ui: null });
  }

  startInstance() {
    console.log('onStart');
    if (this.state.instance !== null && !this.state.started) {
      ReflectUtils.callOnStart(this.state.instance, err => {
        if (!err) {
          this.setState({ started: true });
        }
      });
    }
  }

  stopInstance() {
    console.log('onStop');
    if (this.state.instance !== null && this.state.started) {
      ReflectUtils.callOnStop(this.state.instance, err => {
        if (!err) {
          this.setState({ started: false });
        }
      });
    }
  }

  render(): JSX.Element {
    let error = <div></div>;
    if (!this.compType) {
      error = <div style={styles.error}>You should specify the name of the component in the URL (eg. /?name=MyComp)</div>;
    }

    var instance = <em>No instance created yet</em>;
    if (this.state.ui) {
      instance = this.state.ui;
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>Kevoree Browser Testing - {this.compType}</h3>
        </div>
        <div style={styles.content}>
          {error}
          <div style={styles.leftContent}>
            <fieldset>
              <legend style={styles.legend}>Actions</legend>
              <LifecycleActions
                  onCreate={this.createInstance.bind(this)}
                  onRemove={this.removeInstance.bind(this)}
                  onStart={this.startInstance.bind(this)}
                  onStop={this.stopInstance.bind(this)} />
            </fieldset>
          </div>
          <div style={styles.rightContent}>
            <fieldset>
              <legend style={styles.legend}>Component tile</legend>
              <div style={styles.tile}>
                {instance}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
