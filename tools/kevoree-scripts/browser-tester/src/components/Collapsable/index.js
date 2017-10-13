import React from 'react';
import PropTypes from 'prop-types';

import './collapsable.css';

export default class Collapsable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: props.collapsed };
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const contentClasses = ['content'];
    if (this.state.collapsed) {
      contentClasses.push('collapsed');
    }

    return (
      <div className="collapsable" style={this.props.style}>
        <h3 className="clickable" onClick={() => this.toggle()}>
          <span>{this.props.title}:</span>
          <span className="status">{this.state.collapsed ? 'Show':'Hide'}</span>
        </h3>
        <div className={contentClasses.join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Collapsable.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  collapsed: PropTypes.bool,
  style: PropTypes.object,
};
