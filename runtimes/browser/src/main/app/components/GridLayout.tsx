import * as React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { LayoutDesc } from '../api/LayoutDesc';

const ResponsiveGridLayout = WidthProvider(Responsive);

export class GridLayout extends React.Component<any, any> {
  render(): JSX.Element {
    const brkpts: LayoutDesc<number> = {
      lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
    };
    const cols: LayoutDesc<number> = {
      lg: 6, md: 4, sm: 3, xs: 2, xxs: 1
    };

    return (
      <ResponsiveGridLayout
          {...this.props} breakpoints={brkpts} cols={cols}
          useCSSTransforms={true} rowHeight={250} autoSize={true}
          verticalCompact={true}>
      </ResponsiveGridLayout>
    );
  }
}
