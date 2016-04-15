import * as React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { LayoutDesc } from '../api';

const ResponsiveGridLayout = WidthProvider(Responsive);

export class GridLayout extends React.Component<any, any> {
  render(): JSX.Element {
    const brkpts: LayoutDesc<number> = {
      lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
    };

    return (
      <ResponsiveGridLayout
          {...this.props} breakpoints={brkpts} cols={this.props.cols}
          useCSSTransforms={true} rowHeight={250} autoSize={true}
          verticalCompact={true}>
      </ResponsiveGridLayout>
    );
  }
}
