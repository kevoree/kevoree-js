import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router';
import { GridLayout } from '../../components/GridLayout';
import { Tile } from '../../components/Tile';
import { Component } from '../../api/Component';

export interface RouteParams {}
export interface DashboardProps extends RouteComponentProps<RouteParams, {}> {
  components: Component[]
}
interface DashboardState {
  layout: Object[]
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {

  constructor(props: DashboardProps, ctx: any) {
    super(props, ctx);
    this.state = { layout: [] };
  }

  render() {
    return (
      <div>
        <GridLayout layout={this.state.layout}>
          {this.props.components.map((comp, i) => {
            const layout = {x: i%6, y: 0, w: 1, h: 1};
            return (
              <div key={i} _grid={layout}>
                <Tile {...comp} />
              </div>
            );
          })}
        </GridLayout>
      </div>
    );
  }
}
