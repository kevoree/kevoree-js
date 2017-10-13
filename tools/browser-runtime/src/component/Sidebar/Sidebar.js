import React from 'react';
import logo from './kevoree.svg';
import { Menu, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isActive = (path) => {
    return path === window.location.pathname;
  }

  render() {
    return (
      <Menu className='Sidebar' inverted vertical icon>
        <Menu.Item className='Sidebar-header' header>
          <Image src={logo} className='Sidebar-logo' alt='logo' centered />
        </Menu.Item>
        {this.props.routes.map((route, i) => (
          <Menu.Item key={i} name={route.name} active={this.isActive(route.path)} as={Link} to={route.path}>
            <Icon name={route.icon} size='large' />
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
