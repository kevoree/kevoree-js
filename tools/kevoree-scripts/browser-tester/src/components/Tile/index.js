import React from 'react';
import PropTypes from 'prop-types';

import './tile.css';

export default class Tile extends React.Component {

  resizeIframe(iframe) {
    iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  }

  componentDidMount() {
    if (this.iframe) {
      this.iframe.style.width = 0;
      this.iframe.style.height = 0;
    }
  }

  render() {
    const { name, version } = this.props.instance.getModelEntity().typeDefinition;

    return (
      <div className="tile-container">
        <div className="tile-header">
          <span className="tile-name">{this.props.instance.name}: {name}/{version}</span>
        </div>
        <iframe
          ref={(elem) => this.iframe = elem}
          src={'tile.html?path=' + this.props.instance.getPath()}
          className="tile-content"
          onLoad={(e) => this.resizeIframe(e.target)}>
        </iframe>
      </div>
    );
  }
}

Tile.propTypes = {
  instance: PropTypes.object,
};
