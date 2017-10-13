import React from 'react';
import PropTypes from 'prop-types';
import TinyConf from 'tiny-conf';
import KevScript from 'kevoree-kevscript';
import KevoreeCore from 'kevoree-core';
import kevoree from 'kevoree-library';

import loggerFactory from '../../lib/logger-factory';
import Resolver from '../../lib/Resolver';
import InstanceLoader from '../../lib/InstanceLoader';

import Collapsable from '../Collapsable';
import ErrorUI from '../Error';
import Description from '../Description';
import Dictionary from '../Dictionary';
import Inputs from '../Inputs';
import Outputs from '../Outputs';
import Tile from '../Tile';

import { getType } from '../../lib/model-helper';

import './app.css';

const INSTANCE_NAME = 'comp';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    TinyConf.set('registry', {
      host: 'registry.kevoree.org',
      port: 443,
      ssl: true
    });
    this.logger = loggerFactory.create('Kevoree Browser Tester');
    this.resolver = new Resolver(this.props.model.packages[0].deployUnits[0].hashcode);
    this.kevs = new KevScript(loggerFactory.create('KevScript'));
    this.core = new KevoreeCore(this.resolver, this.kevs, loggerFactory);
    this.factory = new kevoree.factory.DefaultKevoreeFactory();

    this.state = {
      instance: null
    };
  }

  componentDidMount() {
    const loader = this.factory.createJSONLoader();
    const kevlib = loader.loadModelFromString(JSON.stringify(this.props.model)).get(0);

    this.core.start('node0');
    this.kevs.parse(this.props.script, kevlib)
      .then(({model}) => {
        return this.core.deploy(model);
      })
      .catch((error) => {
        this.setState({ error });
      });

    this.core.on('deployed', () => {
      const currentKeys = Object.keys(this.core.nodeInstance.adaptationEngine.modelObjMapper.map);
      const registeredKeys = Object.keys(InstanceLoader.getInstances());

      currentKeys.forEach((key) => {
        const instance = this.core.nodeInstance.adaptationEngine.modelObjMapper.map[key];
        if (instance && typeof instance.uiFactory === 'function') {
          if (!InstanceLoader.has(key)) {
            InstanceLoader.register(key, instance);
            if (instance.name === INSTANCE_NAME) {
              this.setState({ instance });
              document.title = `${instance.getModelEntity().typeDefinition.name} - Kevoree Browser Tester`;
            }
          }
        }
      });

      for (let i = 0; i < registeredKeys.length; i++) {
        const hasKey = currentKeys.find((key) => registeredKeys[i] === key);
        if (!hasKey) {
          // clean removed instance
          InstanceLoader.remove(registeredKeys[i]);
        }
      }
    });

    this.core.on('error', (error) => {
      this.setState({ error });
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <div className="header">
            <h2>Kevoree Browser Tester</h2>
          </div>
          <ErrorUI error={this.state.error} />
        </div>
      );
    } else {
      if (this.state.instance) {
        const modelInstance = this.state.instance.getModelEntity();
        const tdef = modelInstance.typeDefinition;
        const inputs = tdef.provided.array;
        const outputs = tdef.required.array;

        return (
          <div className="container">
            <div className="header">
              <h2>Kevoree Browser Tester</h2>
            </div>
            <div className="content">
              <div className="left">
                <div className="panel">
                  <Collapsable title={getType(tdef.metaClassName())}>
                    <Description instance={this.state.instance} />
                  </Collapsable>
                  <Collapsable title="Parameters">
                    <Dictionary instance={this.state.instance} />
                  </Collapsable>
                  <Collapsable title="Inputs">
                    <Inputs inputs={inputs} instance={this.state.instance} />
                  </Collapsable>
                </div>
              </div>
              <div className="right">
                <div className="panel">
                  <Collapsable title="Tile" style={{ flex: '1 0 auto' }}>
                    <div className="outer-container">
                      <div className="inner-container">
                        <Tile instance={this.state.instance} />
                      </div>
                    </div>
                  </Collapsable>
                  <Collapsable title="Outputs" style={{ flex: '100' }}>
                    <Outputs outputs={outputs} instance={this.state.instance} />
                  </Collapsable>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="loading">
            <strong>Loading...</strong>
          </div>
        );
      }
    }
  }
}

App.propTypes = {
  model: PropTypes.object,
  script: PropTypes.string
};
