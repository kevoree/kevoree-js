import * as React from 'react';
import * as Radium from 'radium';
import { AbstractComponent } from '../../components/AbstractComponent';
import { Component } from '../../api';
import { Actions, ActionToggleComponent } from '../../actions';
import styles from './styles';

export interface UIProps {
  name: string;
}

interface UIState {
  menuOpen: boolean;
}

@Radium
export class Tile extends AbstractComponent<UIProps, UIState> {
  private documentClickHandler: EventListener;
  private documentKeyPressHandler: EventListener;
  private plugin: any;

  constructor(props: UIProps, ctx?: any) {
    super(props, ctx);
    this.documentClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggleMenu();
    };
    this.documentKeyPressHandler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        this.toggleMenu();
      }
    };

    this.state = { menuOpen: false };
  }

  toggleMenu() {
    const comp = this.context.store.getState().components[this.props.name];
    const newState = !this.state.menuOpen;

    if (newState) {
      this.onOpen();
    } else {
      this.onClose();
    }

    this.setState({ menuOpen: newState });
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
    event.stopPropagation();
    this.toggleMenu();
  }

  menuBtnKeyHandler(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleMenu();
    }
  }

  onHideClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleComponent();
  }

  onHideKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleComponent();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('click', this.documentClickHandler);
    document.removeEventListener('keyup', this.documentKeyPressHandler);
    // this.plugin.disconnect();
  }

  onOpen() {
    document.addEventListener('click', this.documentClickHandler);
    document.addEventListener('keyup', this.documentKeyPressHandler);
  }

  onClose() {
    document.removeEventListener('click', this.documentClickHandler);
    document.removeEventListener('keyup', this.documentKeyPressHandler);
  }

  render(): JSX.Element {
    const comp = this.context.store.getState().components[this.props.name];

    return (
      <div style={styles.tile}>
        <div className='row' style={styles.header}>
          <div className='drag-anchor' style={styles.description}>
            <span style={styles.name}>{this.props.name}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{comp.type}</span>
          </div>
          <div
              style={[styles.menu, this.state.menuOpen && styles.open]}
              onClick={this.menuBtnClickHandler.bind(this)}
              onKeyDown={this.menuBtnKeyHandler.bind(this)}>
            <span className='fa fa-caret-square-o-down'></span>
            <ul style={[styles.items, !this.state.menuOpen && styles.hide]}>
              <li style={styles.item}
                  onClick={this.onHideClick.bind(this)}
                  onKeyDown={this.onHideKey.bind(this)}>Hide</li>
            </ul>
          </div>
        </div>
        <div className='overlay'></div>
        <div className='content' style={styles.content}>
          {/*<iframe
              ref='iframe'
              name={comp.name}
              width='100%'
              height='100%'
              frameBorder='0'></iframe>*/}
        </div>
      </div>
    );
  }
}
