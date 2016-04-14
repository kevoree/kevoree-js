import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router';
import { Layout } from 'react-grid-layout';
import { GridLayout } from '../../components/GridLayout';
import { Tile } from '../../components/tile/Tile';
import { Component } from '../../api/Component';
import { LayoutDesc } from '../../api/LayoutDesc';

export interface RouteParams {}
export interface DashboardProps extends RouteComponentProps<RouteParams, {}> {
  layouts: LayoutDesc<Layout[]>
  onLayoutChange: (layout: Layout, layouts: LayoutDesc<Layout[]>) => void;
  components: Component[];
}
interface DashboardState {
  layouts: LayoutDesc<Layout[]>
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {

  constructor(props: DashboardProps, ctx: any) {
    super(props, ctx);
    this.state = { layouts: this.props.layouts };
  }

  resetLayout() {
    this.setState({
      layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
    });
  }

  onLayoutChange(layout: Layout, layouts: LayoutDesc<Layout[]>) {
    this.setState({ layouts: layouts });
    this.props.onLayoutChange(layout, layouts);
  }

  onHide(comp: Component) {
    console.log('hide', comp);
    comp.hide = true;
    this.forceUpdate();
  }

  onReset() {}

  onResetClick(event: MouseEvent) {
    event.preventDefault();
    this.onReset();
  }

  onResetKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onReset();
    }
  }

  render() {
    const components = this.props.components.filter(comp => {
      return !comp.hide;
    });

    return (
      <div>
        <GridLayout
            layouts={this.state.layouts}
            onLayoutChange={this.onLayoutChange.bind(this)}
            draggableCancel=".tile .content">
          {components.map((comp, i) => {
            const layout: Layout = {i: i+'', x: i%6, y: 0, w: 1, h: 1};
            return (
              <div key={i} _grid={layout}>
                <Tile {...comp} onHide={this.onHide.bind(this, comp)} />
              </div>
            );
          })}
        </GridLayout>
      </div>
    );
  }
}
