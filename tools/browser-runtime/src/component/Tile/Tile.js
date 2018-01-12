import React from 'react';
import { Icon } from 'semantic-ui-react';

import './Tile.css';

export default class Tile extends React.Component {

  changeState() {
    if (this.props.instance.started) {
      this.props.instance.submitScript(`stop ${this.props.instance.nodeName}.${this.props.instance.name}`);
    } else {
      this.props.instance.submitScript(`start ${this.props.instance.nodeName}.${this.props.instance.name}`);
    }
  }

  close() {
    this.props.instance.submitScript(`remove ${this.props.instance.nodeName}.${this.props.instance.name}`);
  }

  componentWillUnmount() {
      console.log('Tile unmount:', this.props.instance.path);
  }

  render() {
      const name = this.props.instance.name;
      const tdef = this.props.instance.getModelEntity().typeDefinition;

      return (
        <div className='Tile' ref={(elem) => this.tile = elem}>
          <div className='Tile-header'>
              <h3 className='Tile-name'>{name + ': ' + tdef.name + '/' + tdef.version}</h3>
              <div className='Tile-actions'>
                <span className='Tile-action' onClick={() => this.changeState()}>
                  <Icon name={this.props.instance.started ? 'stop circle':'play circle'} />
                </span>
                <span className='Tile-action' onClick={() => this.close()}>
                  <Icon name='window close' />
                </span>
              </div>
          </div>
          <div className='Tile-content'>
            {!this.props.instance.started && (
              <div className='Tile-stopped-overlay'>
                <p>STOPPED</p>
              </div>
            )}
            <div className='Tile-overlay' style={this.props.instance._showOverlay ? {display: 'block'}:{display: 'none'}} />
            <iframe
              title={this.props.instance.getPath()}
              src={'tile.html?path=' + encodeURI(this.props.instance.getPath())}
              frameBorder='0'
              marginHeight='0'
              marginWidth='0'>
            </iframe>
          </div>
        </div>
      );
  }
}
