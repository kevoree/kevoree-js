import * as React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { LayoutDesc } from '../api';
const ResponsiveGridLayout = WidthProvider(Responsive);

export class GridLayout extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <ResponsiveGridLayout
          {...this.props} cols={this.props.cols} useCSSTransforms={true}
          rowHeight={250} autoSize={true} verticalCompact={false}
          margin={[5, 5]} className="layout">
      </ResponsiveGridLayout>
    );
  }
}
