import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router';
import { GridLayout } from '../../components/GridLayout';

export interface RouteParams {}
export interface DashboardProps extends RouteComponentProps<RouteParams, {}> {}
interface DashboardState {
  layout: Object[]
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {

  constructor(props: DashboardProps, ctx: any) {
    super(props, ctx);
    this.state = { layout: [] };
  }

  onClick() {

  }

  render() {
    var components = [
      { name: 'comp0' }, { name: 'comp1' }, { name: 'comp2' },
      { name: 'comp3' }, { name: 'comp4' }, { name: 'comp5' },
      { name: 'comp6' }, { name: 'comp7' }, { name: 'comp8' }
    ];

    return (
      <div>
        <button className="small" onClick={this.onClick.bind(this)}>Auto-layout</button>
        <GridLayout layout={this.state.layout}>
          {components.map((comp, i) => {
            const layout = {x: i%6, y: 0, w: 1, h: 1};
            return <div key={i} _grid={layout}>{comp.name}</div>;
          })}
        </GridLayout>
      </div>
    );
  }
}
