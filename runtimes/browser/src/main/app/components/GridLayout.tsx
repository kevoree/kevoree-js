import * as React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

export class GridLayout extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <ResponsiveGridLayout {...this.props}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 6, md: 4, sm: 3, xs: 2, xxs: 1}} useCSSTransforms={true}
          rowHeight={250} autoSize={true} verticalCompact={false}>
      </ResponsiveGridLayout>
    );
  }
}
