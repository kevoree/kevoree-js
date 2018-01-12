import React from 'react';
import PageContent from '../../component/PageContent';
import Tile from '../../component/Tile';
import GridLayout from '../../component/GridLayout';
import Loading from '../../component/Loading';

import './Home.css';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { instances: props.services.core.getInstances() };
  }

  onDeploy = () => {
    this.setState({ instances: this.props.services.core.getInstances() });
  }

  componentDidMount() {
    this.props.services.core.on('deployed', this.onDeploy);
  }

  componentWillUnmount() {
    this.props.services.core.off('deployed', this.onDeploy);
  }

  onDragOrResizeStart = () => {
    this.setState({
      instances: this.state.instances.map((instance) => {
        instance._showOverlay = true;
        return instance;
      })
    });
  }

  onDragOrResizeStop = () => {
    this.setState({
      instances: this.state.instances.map((instance) => {
        instance._showOverlay = false;
        return instance;
      })
    });
  }

  hasInstances() {
    return this.state.instances.length > 0;
  }

  render() {
    return (
      <PageContent
        title='Browser Runtime'
        subtitle={`${this.props.nodeName}: ${this.props.nodeType}`}>
        {this.hasInstances() ? (
          <GridLayout
              draggableHandle='.Tile-name'
              onDragStart={this.onDragOrResizeStart}
              onDragStop={this.onDragOrResizeStop}
              onResizeStart={this.onDragOrResizeStart}
              onResizeStop={this.onDragOrResizeStop}>
            {this.state.instances.map((instance) => (
              <div key={instance.path} className='Grid-elem'>
                <Tile instance={instance} />
              </div>
            ))}
          </GridLayout>
        ):(
          <div className='Home-empty'>
            <Loading title='Info' msg='Add components in order to see their tiles here' icon='info' />
          </div>
        )}
      </PageContent>
    );
  }
}
