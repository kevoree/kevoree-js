import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      const title = this.state.error.message;
      const stack = this.state.error.stack.split('\n').slice(1).join('\n');

      return (
        <div className="error-container">
          <div className="error">
            <h2>{title}</h2>
            <pre className="stack">{stack}</pre>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
