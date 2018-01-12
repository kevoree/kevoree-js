import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

import './PageContent.css';

const PageContent = ({ title, subtitle, rightTitle, rightSubtitle, children }) => (
  <div className='PageContent'>
    <Segment inverted className='PageContent-header'>
      <Header as='h2' inverted floated='left'>
        {title}
        <Header.Subheader>{subtitle}</Header.Subheader>
      </Header>
      <Header as='h2' inverted floated='right'>
        {rightTitle}
        <Header.Subheader>{rightSubtitle}</Header.Subheader>
      </Header>
    </Segment>
    <div className='PageContent-content'>
      {children}
    </div>
  </div>
);

PageContent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any,
  rightTitle: PropTypes.string,
  rightSubtitle: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element).isRequired,
  ]),
};

export default PageContent;
