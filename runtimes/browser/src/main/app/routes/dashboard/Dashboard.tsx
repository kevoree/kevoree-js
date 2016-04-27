import * as React from 'react';
import { AbstractComponent } from '../../components/AbstractComponent';
import { Link, RouteComponentProps } from 'react-router';
import { Layout } from 'react-grid-layout';
import { GridLayout } from '../../components/GridLayout';
import { Tile } from '../../components/tile/Tile';
import { Component, LayoutDesc, Context } from '../../api';
import { ActionBar, Action } from '../../components/action-bar/ActionBar';
import LayoutUtils from '../../util/LayoutUtils';
import {
  Actions, ActionLayoutChange, ActionArrangeLayout, ActionMinifyLayout,
  ActionBreakpointChange
} from '../../actions';

interface UIProps extends RouteComponentProps<void, void> {}

export class Dashboard extends AbstractComponent<UIProps, void> {

  constructor(props: UIProps, context: Context) {
    super(props, context);
  }

  onArrange() {
    this.context.store.dispatch<ActionArrangeLayout>({
      type: Actions.ARRANGE_LAYOUT,
      breakpoint: this.context.store.getState().currentBrkpt,
      cols: this.context.store.getState().cols
    });
  }

  onMinify() {
    this.context.store.dispatch<ActionMinifyLayout>({
      type: Actions.MINIFY_LAYOUT,
      breakpoint: this.context.store.getState().currentBrkpt,
      cols: this.context.store.getState().cols
    });
  }

  onLayoutChange(layout: Layout, layouts: LayoutDesc<Layout[]>) {
    const equals = LayoutUtils.equals(this.getLayouts(), layouts);
    if (!equals) {
      const currentBrkpt = this.context.store.getState().currentBrkpt;
      this.context.store.dispatch<ActionLayoutChange>({
        type: Actions.LAYOUT_CHANGE,
        breakpoint: currentBrkpt,
        layouts: layouts[currentBrkpt]
      });
    }
  }

  onBreakpointChange(brkpt: string, nbCols: number) {
    this.context.store.dispatch<ActionBreakpointChange>({
      type: Actions.BRKPT_CHANGE,
      value: brkpt
    })
  }

  private getLayouts(): LayoutDesc<Layout[]> {
    const state = this.context.store.getState();
    const layouts: LayoutDesc<Layout[]> = {
      lg: [], md: [], sm: [], xs: [], xxs: []
    };
    Object.keys(state.components).forEach(name => {
      Object.keys(state.cols).forEach(key => {
        layouts[key].push(state.components[name].layouts[key]);
      });
    });
    return layouts;
  }

  private displayOverlays() {
    const overlays = document.getElementsByClassName('overlay');
    for (let i=0; i < overlays.length; i++) {
      const elem = overlays[i] as HTMLElement;
      elem.style.display = 'block';
    }
  }

  private hideOverlays() {
    const overlays = document.getElementsByClassName('overlay');
    for (let i=0; i < overlays.length; i++) {
      const elem = overlays[i] as HTMLElement;
      elem.style.display = 'none';
    }
  }

  render() {
    const state = this.context.store.getState();
    const layouts = this.getLayouts();
    const components = Object.keys(state.components).map(name => {
      return state.components[name];
    }).filter(comp => {
      return !comp.hide;
    });

    return (
      <div>
        <ActionBar>
          <Action
              handler={this.onArrange.bind(this)}
              helper="Tries to arrange components">Arrange</Action>
          <Action
              handler={this.onMinify.bind(this)}
              helper="Sets each component's width and height to their minimum">Minify</Action>
        </ActionBar>
        <GridLayout
            ref="grid"
            breakpoints={state.breakpoints}
            cols={state.cols}
            layouts={layouts}
            onLayoutChange={this.onLayoutChange.bind(this)}
            onBreakpointChange={this.onBreakpointChange.bind(this)}
            onDragStart={this.displayOverlays.bind(this)}
            onResizeStart={this.displayOverlays.bind(this)}
            onDragStop={this.hideOverlays.bind(this)}
            onResizeStop={this.hideOverlays.bind(this)}
            draggableHandle=".drag-anchor, .drag-anchor *">
          {components.map(comp => {
            return (
              <div key={comp.name} className={['yoloSwagLord-'+comp.name]}>
                <Tile {...comp} />
              </div>
            );
          })}
        </GridLayout>
      </div>
    );
  }
}
