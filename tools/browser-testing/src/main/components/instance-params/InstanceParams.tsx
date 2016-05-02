import * as React from 'react';
import { ReflectUtils } from 'kevoree-reflect-utils';
import styles from './styles';

interface UIProps {
  instance: any;
  started: boolean;
}

export class InstanceParams extends React.Component<UIProps, void> {

  stringUpdate(param: any, event: Event) {
    // param.ref = (event.target as any).value;
    const value = (event.target as any).value + '';
    console.log(param, value);
    this.props.instance[param.name] = value;
    this.forceUpdate();
  }

  numberUpdate(param: any, event: Event) {
    // param.ref = (event.target as any).value;
    const value = parseInt((event.target as any).value, 10);
    console.log(param, value);
    this.props.instance[param.name] = value;
    this.forceUpdate();
  }

  booleanUpdate(param: any, event: Event) {
    console.log('boolean', (event.target as any).checked);
    const value = !!(event.target as any).checked;
    console.log(param, value);
    this.props.instance[param.name] = value;
    this.forceUpdate();
  }

  render(): JSX.Element {
    let params = [];
    if (this.props.instance) {
      params = ReflectUtils.getParams(this.props.instance).map((param, i) => {
        switch (param.type) {
          case 'string':
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <input
                    name={param.name}
                    type='text'
                    checked={this.props.instance[param.name]}
                    onChange={this.stringUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.strOrNumberInput} />
              </li>
            );

          case 'number':
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <input
                    name={param.name}
                    type='number'
                    value={this.props.instance[param.name]}
                    onChange={this.numberUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.strOrNumberInput} />
              </li>
            );

          case 'boolean':
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <input
                    name={param.name}
                    type='checkbox'
                    value={this.props.instance[param.name]}
                    onChange={this.booleanUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.booleanInput} />
              </li>
            );
        }
      });

      if (params.length === 0) {
        params.push(
          <li key='0'>
            <em>This type does not have dictionary parameters</em>
          </li>
        );
      }
    }

    return (
      <ul style={styles.list}>{params}</ul>
    );
  }
}
