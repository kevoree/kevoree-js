import * as React from 'react';
import { ReflectUtils, ParamDetails } from 'kevoree-api';
import styles from './styles';

interface UIProps {
  instance: any;
  started: boolean;
}

export class InstanceParams extends React.Component<UIProps, void> {

  stringUpdate(param: ParamDetails, event: Event) {
    this.props.instance[param.name] = (event.target as any).value + '';
    this.forceUpdate();
  }

  numberUpdate(param: ParamDetails, event: Event) {
    let value = parseInt((event.target as any).value, 10);
    value = Math.min(value, param.max || +Infinity);
    value = Math.max(value, param.min || -Infinity);
    this.props.instance[param.name] = value;
    this.forceUpdate();
  }

  booleanUpdate(param: ParamDetails, event: Event) {
    this.props.instance[param.name] = !!(event.target as any).checked;
    this.forceUpdate();
  }

  selectUpdate(param: ParamDetails, event: Event) {
    this.props.instance[param.name] = (event.target as any).value;
    this.forceUpdate();
  }

  render(): JSX.Element {
    let params = [];
    if (this.props.instance) {
      params = ReflectUtils.getParams(this.props.instance).map((param, i) => {
        switch (param.type) {
          case 'string':
            if (param.multi) {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.textareaLabel}>{param.name}</label>
                  <textarea
                      name={param.name}
                      onChange={this.stringUpdate.bind(this, param)}
                      value={this.props.instance[param.name]}
                      disabled={this.props.started}
                      style={styles.textarea} />
                </li>
              );
            } else {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.label}>{param.name}</label>
                  <input
                      name={param.name}
                      type='text'
                      value={this.props.instance[param.name]}
                      onChange={this.stringUpdate.bind(this, param)}
                      disabled={this.props.started}
                      style={styles.stringInput} />
                </li>
              );
            }

          case 'int':
          case 'float':
          case 'double':
          case 'short':
          case 'long':
            if (typeof param.min === 'undefined' && typeof param.max === 'undefined') {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.label}>{param.name}</label>
                  <input
                      name={param.name}
                      type='number'
                      value={this.props.instance[param.name]}
                      onChange={this.numberUpdate.bind(this, param)}
                      disabled={this.props.started}
                      style={styles.numberInput} />
                </li>
              );
            } else if (typeof param.min !== 'undefined' && typeof param.max !== 'undefined') {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.label}>{param.name}</label>
                  <input
                      name={param.name}
                      type='number'
                      value={this.props.instance[param.name]}
                      min={param.min}
                      max={param.max}
                      onChange={this.numberUpdate.bind(this, param)}
                      disabled={this.props.started}
                      style={styles.numberInput} />
                </li>
              );
            } else if (typeof param.min !== 'undefined' && typeof param.max === 'undefined') {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.label}>{param.name}</label>
                  <input
                      name={param.name}
                      type='number'
                      value={this.props.instance[param.name]}
                      min={param.min}
                      onChange={this.numberUpdate.bind(this, param)}
                      disabled={this.props.started}
                      style={styles.numberInput} />
                </li>
              );
            } else {
              return (
                <li key={i} style={styles.listItem}>
                  <label for={param.name} style={styles.label}>{param.name}</label>
                  <input
                      name={param.name}
                      type='number'
                      value={this.props.instance[param.name]}
                      max={param.max}
                      onChange={this.numberUpdate.bind(this, param)}
                      disabled={this.props.started}
                      style={styles.numberInput} />
                </li>
              );
            }

          case 'boolean':
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <input
                    name={param.name}
                    type='checkbox'
                    checked={this.props.instance[param.name]}
                    onChange={this.booleanUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.booleanInput} />
              </li>
            );

          case 'choice':
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <select
                    name={param.name}
                    value={this.props.instance[param.name]}
                    onChange={this.selectUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.booleanInput}>
                  {param.choices.map((item, i) => {
                    return (<option key={i} value={i}>{item}</option>);
                  })}
                </select>
              </li>
            );

          default:
            return (
              <li key={i} style={styles.listItem}>
                <label for={param.name} style={styles.label}>{param.name}</label>
                <input
                    name={param.name}
                    type='text'
                    value={this.props.instance[param.name]}
                    onChange={this.booleanUpdate.bind(this, param)}
                    disabled={this.props.started}
                    style={styles.stringInput} />
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
