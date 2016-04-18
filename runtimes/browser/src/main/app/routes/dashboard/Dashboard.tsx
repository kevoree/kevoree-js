import './dashboard.css';

import * as React from 'react';
import { AbstractComponent } from '../../components/AbstractComponent';
import { Link, RouteComponentProps } from 'react-router';
import { Layout } from 'react-grid-layout';
import { GridLayout } from '../../components/GridLayout';
import { Tile } from '../../components/tile/Tile';
import { Component, LayoutDesc } from '../../api';
import { Actions, ActionLayoutChange } from '../../actions';
import { ActionBar, Action } from '../../components/action-bar/ActionBar';

interface UIProps extends RouteComponentProps<{}, {}> {}

export class Dashboard extends AbstractComponent<UIProps, {}> {

  onReset() {
    this.context.store.dispatch<ActionLayoutChange>({
      type: Actions.LAYOUT_CHANGE,
      layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
    });
  }

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

  onSave() {
    console.log('my grid', this.context.store.getState().layouts);
    this.context.store.dispatch<ActionLayoutChange>({
      type: Actions.LAYOUT_CHANGE,
      layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
    });
  }

  onSaveClick(event: MouseEvent) {
    event.preventDefault();
    this.onSave();
  }

  onSaveKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onSave();
    }
  }

  onLayoutChange(layout: Layout, layouts: LayoutDesc<Layout[]>) {
    this.context.store.dispatch<ActionLayoutChange>({
      type: Actions.LAYOUT_CHANGE,
      layouts: layouts
    });
  }

  render() {
    const state = this.context.store.getState();
    let currentX = 0, currentY = 0;

    const components = Object.keys(state.components).map(name => {
      return state.components[name];
    }).filter(comp => {
      return !comp.hide;
    });

    return (
      <div>
        <ActionBar>
          <Action
              handler={this.onReset.bind(this)}
              helper="Restore default layout">ResetLayout</Action>
          <Action
              handler={this.onSave.bind(this)}
              helper="Save current layout as default">SaveLayout</Action>
        </ActionBar>
        <GridLayout
            layouts={state.layouts}
            cols={state.cols}
            onLayoutChange={this.onLayoutChange.bind(this)}
            draggableCancel=".tile .content">
          {components.map((comp, i) => {
            if ((currentX + (comp.layout.w || 1)) > 6) {
              currentY += 1;
              currentX = 0;
            }

            const layout: Layout = {
              i: comp.name,
              x: currentX,
              y: currentY,
              w: comp.layout.w || 1,
              h: comp.layout.h || 1,
              minW: comp.layout.minW || 1,
              minH: comp.layout.minH || 1,
              maxW: comp.layout.maxW,
              maxH: comp.layout.maxH
            };

            currentX += comp.layout.w;
            if (currentX >= 6) {
              currentY += 1;
              currentX = 0;
            }
            return (
              <div key={comp.name} _grid={layout}>
                <Tile {...comp} />
              </div>
            );
          })}
        </GridLayout>
      </div>
    );
  }
}
