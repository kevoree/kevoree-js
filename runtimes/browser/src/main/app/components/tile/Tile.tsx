import './tile.css';

import * as React from 'react';
import * as classnames from 'classnames';
import { Component } from '../../api/Component';

export interface UIProps extends Component {
  onHide: () => void;
}
interface UIState {
  menuOpen: boolean
}

export class Tile extends React.Component<UIProps, UIState> {
  private globalClickHandler: EventListener;
  private globalKeyPressHandler: EventListener;

  constructor(props: UIProps) {
    super(props);
    this.state = { menuOpen: false };
    this.globalClickHandler = (event) => {
      event.preventDefault();
      this.toggleMenu();
    };
    this.globalKeyPressHandler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        event.preventDefault();
        this.toggleMenu();
      }
    };
  }

  toggleMenu() {
    const newState = !this.state.menuOpen;
    this.setState({ menuOpen: newState });
    if (newState) {
      this.onOpen();
    } else {
      this.onClose();
    }
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

  componentWillUnmount() {
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
    return (
      <div className="tile">
        <div className="header row">
          <div className="description">
            <span className="name">{this.props.name}</span>
            <span>&nbsp;-&nbsp;</span>
            <span className="type">{this.props.type}</span>
          </div>
          <div
              className={classnames('menu', { open: this.state.menuOpen })}
              onClick={this.menuBtnClickHandler.bind(this)}
              onKeyDown={this.menuBtnKeyHandler.bind(this)}>
            <span className="fa fa-caret-square-o-down"></span>
            <ul className="items" style={{ display: (this.state.menuOpen ? 'block' : 'none') }}>
              <li onClick={this.props.onHide.bind(this)}>Hide</li>
            </ul>
          </div>
        </div>
        <div className="content"></div>
      </div>
    );
  }
}
