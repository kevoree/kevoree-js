import React from 'react';
import PageContent from '../../component/PageContent';

import './Home.css';

export default class Home extends React.Component {

  render() {
    return (
      <PageContent
        title='Browser Runtime'
        subtitle={`${this.props.name}: ${this.props.type}`}>
        Home page content
      </PageContent>
    );
  }
}
