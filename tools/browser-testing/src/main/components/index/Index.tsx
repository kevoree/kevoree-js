import * as React from 'react';
import { Services, Injector, Context, LoggerFactory } from 'kevoree-api';
import { UIProcessor } from 'kevoree-ui';
import { ReflectUtils } from 'kevoree-reflect-utils';
import { Registry } from '../../utils/Registry';
import { LifecycleActions } from '../lifecycle-actions/LifecycleActions';
import { InstanceParams } from '../instance-params/InstanceParams';
import { Inputs } from '../inputs/Inputs';
import { ModelServiceImpl } from '../../services/ModelServiceImpl';
import { ContextServiceImpl } from '../../services/ContextServiceImpl';
import { URLUtils } from '../../utils/URLUtils';
import { InstanceUtils } from '../../utils/InstanceUtils';
import styles from './styles';

declare const KevoreeBrowserRegistry: Registry;

interface UIState {
  started?: boolean;
  ui?: React.ReactElement<any>;
  instance?: any;
  typeName?: string;
  type?: any;
}

export class Index extends React.Component<void, UIState>  {

  private injector: Injector;

  constructor(props: void) {
    super(props);
    this.state = {
      typeName: null,
      type: null,
      instance: null,
      started: false,
      ui: null
    };

    // create an injector
    this.injector = new Injector();
    // add the model service on it
    var modelService = new ModelServiceImpl();
    this.injector.register(Services.Model, modelService);
  }

  init(name: string, type: any) {
    this.setState({ typeName: name, type: type });
  }

  createInstance() {
    if (this.state.instance === null) {
      // create an instance
      const instance = new this.state.type();
      const nodeName = 'node0';
      const compName = 'yourComp';

      // contextual injector for the instance
      var ctx = new Context();
      ctx.register(Services.Logger, LoggerFactory.createLogger('comp'));
      ctx.register(Services.Context, new ContextServiceImpl(compName, nodeName));

      // inject services in instance
      this.injector.inject(instance, ctx);
      InstanceUtils.injectOutputs(instance, nodeName, compName);

      this.setState({
        instance: instance,
        ui: UIProcessor.render(instance),
        started: false
      });

    }
  }

  removeInstance() {
    this.stopInstance();
    this.setState({ instance: null, ui: null });
  }

  startInstance() {
    if (this.state.instance !== null && !this.state.started) {
      ReflectUtils.callOnStart(this.state.instance, err => {
        if (!err) {
          this.setState({ started: true });
        }
      });
    }
  }

  stopInstance() {
    if (this.state.instance !== null && this.state.started) {
      ReflectUtils.callOnStop(this.state.instance, err => {
        if (!err) {
          this.setState({ started: false });
        }
      });
    }
  }

  render(): JSX.Element {
    var instance = <em>No instance created yet</em>;
    if (this.state.ui) {
      instance = this.state.ui;
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>Kevoree Browser Testing - {this.state.typeName}</h3>
        </div>
        <div style={styles.content}>
          <div style={styles.leftContent}>
            <fieldset>
              <legend style={styles.legend}>Actions</legend>
              <LifecycleActions
                  onCreate={this.createInstance.bind(this)}
                  onRemove={this.removeInstance.bind(this)}
                  onStart={this.startInstance.bind(this)}
                  onStop={this.stopInstance.bind(this)} />
            </fieldset>
            <fieldset style={styles.fieldset(!!this.state.instance)}>
              <legend style={styles.legend}>Params</legend>
              <InstanceParams {...this.state} />
            </fieldset>
            <Inputs {...this.state} />
          </div>

          <div style={styles.rightContent}>
            <fieldset style={styles.paddingTop}>
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
