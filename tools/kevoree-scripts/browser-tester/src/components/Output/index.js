import React from 'react';
import PropTypes from 'prop-types';

import './output.css';

export default class Output extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  clearList() {
    this.setState({ messages: [] });
  }

  componentDidMount() {
    const oldFunc = this.props.instance[`out_${this.props.port.name}`];
    const self = this;
    function decoratedOutput(msg) {
      oldFunc(msg);
      self.setState({ messages: self.state.messages.concat(msg) });
    }
    this.props.instance[`out_${this.props.port.name}`] = decoratedOutput;
  }

  render() {
    return (
      <div className="output">
        <div className="output-header">
          <h4>
            <span className="name">{this.props.port.name}</span>
            <span className="clickable" onClick={() => this.clearList()}>
              <i className="fa fa-trash"></i>
            </span>
          </h4>
        </div>
        <ul className="list">
          {this.state.messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    );
  }
}

Output.propTypes = {
  port: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired,
};
