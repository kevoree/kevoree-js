import React from 'react';
import PropTypes from 'prop-types';

export default class Param extends React.Component {

  constructor(props) {
    super(props);
    let type, value;
    switch (this.props.attr.datatype.toString()) {
      case 'INT':
      case 'LONG':
      case 'FLOAT':
      case 'SHORT':
      case 'DOUBLE':
        type = 'number';
        value = this.props.param.value;
        break;

      case 'BOOLEAN':
        type = 'checkbox';
        value = isTrue(this.props.param.value);
        break;

      case 'STRING':
      default:
        type = 'text';
        value = this.props.param.value;
        break;
    }

    this.state = { type, value };
  }

  updateValue(paramName, value) {
    const { nodeName, name } = this.props.instance;
    this.props.instance.submitScript(`set ${nodeName}.${name}.${paramName} = '${value}'`);
    this.setState({ value });
  }

  render() {
    if (this.state.type === 'checkbox') {
      return <input
        type={this.state.type}
        checked={this.state.value}
        onChange={(e) => this.updateValue(this.props.param.name, e.target.checked)} />;
    } else {
      return <input
        type={this.state.type}
        value={this.state.value}
        onChange={(e) => this.updateValue(this.props.param.name, e.target.value)} />;
    }
  }
}

Param.propTypes = {
  param: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired,
};

function isTrue(val) {
  return val !== null && val !== undefined && (val === true || val === 'true');
}
