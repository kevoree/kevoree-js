import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import localStorage from '../../lib/local-storage';

const Layout = WidthProvider(Responsive);

export default class GridLayout extends React.PureComponent {

  static defaultProps = {
    cols: { xlg: 6, lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 },
    breakpoints: { xlg: 1420, lg: 1200, md: 996, sm: 720, xs: 550, xxs: 0 },
    isDraggable: true,
    isResizable: true,
    compactType: 'vertical',
    useCSSTransforms: true,
    margin: [15, 15],
    autoSize: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: localStorage.get('layouts') || {},
    };
  }

  onLayoutChange(curr, all) {
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(curr, all);
    }
    localStorage.set('layouts', all);
    this.setState({ layouts: all });
  }

  render() {
    return (
      <Layout
        {...this.props}
        layouts={this.state.layouts}
        onLayoutChange={(curr, all) => this.onLayoutChange(curr, all)} />
    );
  }
}
