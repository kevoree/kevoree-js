import './tile.css';

import * as React from 'react';
import * as classnames from 'classnames';
import { AbstractComponent } from '../../components/AbstractComponent';
import { Component } from '../../api';
import {
  Actions, ActionToggleComponent, ActionToggleComponentMenu
} from '../../actions';

export interface UIProps {
  name: string;
}

export class Tile extends AbstractComponent<UIProps, {}> {
  private globalClickHandler: EventListener;
  private globalKeyPressHandler: EventListener;

  toggleMenu() {
    const comp = this.context.store.getState().components[this.props.name];
    const newState = !comp.menuOpen;
    this.context.store.dispatch<ActionToggleComponentMenu>({
      type: Actions.TOGGLE_COMP_MENU,
      name: comp.name,
      open: newState
    });

    if (newState) {
      this.onOpen();
    } else {
      this.onClose();
    }
  }

  toggleComponent() {
    const comp = this.context.store.getState().components[this.props.name];
    this.context.store.dispatch<ActionToggleComponent>({
      type: Actions.TOGGLE_COMP,
      name: comp.name,
      hidden: !comp.hide
    });
  }

  menuBtnClickHandler(event: MouseEvent) {
    event.preventDefault();
    this.toggleMenu();
  }

  menuBtnKeyHandler(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.toggleMenu();
    }
  }

  onHideClick(event: MouseEvent) {
    event.preventDefault();
    this.toggleComponent();
  }

  onHideKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.toggleComponent();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('click', this.globalClickHandler);
    document.removeEventListener('keyup', this.globalKeyPressHandler);
  }

  onOpen() {
    document.addEventListener('click', this.globalClickHandler);
    document.addEventListener('keyup', this.globalKeyPressHandler);
  }

  onClose() {
    document.removeEventListener('click', this.globalClickHandler);
    document.removeEventListener('keyup', this.globalKeyPressHandler);
  }

  render(): JSX.Element {
    const comp = this.context.store.getState().components[this.props.name];

    return (
      <div className="tile">
        <div className="header row">
          <div className="description">
            <span className="name">{this.props.name}</span>
            <span>&nbsp;-&nbsp;</span>
            <span className="type">{comp.type}</span>
          </div>
          <div
              className={classnames('menu', { open: comp.menuOpen })}
              onClick={this.menuBtnClickHandler.bind(this)}
              onKeyDown={this.menuBtnKeyHandler.bind(this)}>
            <span className="fa fa-caret-square-o-down"></span>
            <ul className="items" style={{ display: (comp.menuOpen ? 'block' : 'none') }}>
              <li onClick={this.onHideClick.bind(this)}
                  onKeyDown={this.onHideKey.bind(this)}>Hide</li>
            </ul>
          </div>
        </div>
        <div className="content"></div>
      </div>
    );
  }
}
