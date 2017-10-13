import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChange(value) {
    this.setState({ value });
  }

  onKeyPress(e) {
    if (e.charCode === 13 || e.keyCode === 13) { // 'enter' key
      this.onSend();
    }
  }

  onSend() {
    this.props.instance[`in_${this.props.port.name}`](this.state.value);
    this.setState({ value: '' });
  }

  render() {
    const key = `input-${this.props.port.name}`;

    return (
      <div className="input">
        <label htmlFor={key}>{this.props.port.name}:</label>
        <div className="group">
          <input
            type="text"
            name={key}
            value={this.state.value}
            onChange={(e) => this.onChange(e.target.value)}
            onKeyPress={(e) => this.onKeyPress(e)} />
          <button onClick={() => this.onSend()}>Send</button>
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  port: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired,
};
