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
  constructor(props: UIProps) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  toggleMenuClick(event: MouseEvent) {
    event.preventDefault();
    this.toggleMenu();
  }

  toggleMenuKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.toggleMenu();
    }
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
              onClick={this.toggleMenuClick.bind(this)}
              onKeyDown={this.toggleMenuKey.bind(this)}>
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
