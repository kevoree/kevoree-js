import React from 'react';
import PropTypes from 'prop-types';
import { ResizableBox } from 'react-resizable';

import 'react-resizable/css/styles.css';
import './tile.css';

export default class Tile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { overlay: false };
  }

  onResizeStart() {
    this.setState({ overlay: true });
  }

  onResizeStop() {
    this.setState({ overlay: false });
  }

  render() {
    const { name, version } = this.props.instance.getModelEntity().typeDefinition;

    return (
      <ResizableBox
          width={200}
          height={150}
          minConstraints={[200, 150]}
          handleSize={[20,20]}
          onResizeStart={() => this.onResizeStart()}
          onResizeStop={() => this.onResizeStop()}>
        <div className="tile-container">
          <div className="tile-header">
            <span className="tile-name">{this.props.instance.name}: {name}/{version}</span>
          </div>
          <div className="tile-content">
            <div className="tile-overlay" style={this.state.overlay ? {display:'block'}:{display:'none'}}></div>
            <iframe
              ref={(elem) => this.iframe = elem}
              src={'tile.html?path=' + this.props.instance.getPath()}
              frameBorder='0'
              marginHeight='0'
              marginWidth='0'>
            </iframe>
          </div>
        </div>
      </ResizableBox>
    );
  }
}

Tile.propTypes = {
  instance: PropTypes.object,
};
