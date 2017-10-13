import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import './PageContent.css';

const PageContent = ({ title, subtitle, children }) => (
  <Container fluid className='PageContent'>
    <Header  className='PageContent-header' as='h1' attached='top' inverted>
      {title}
      <Header.Subheader>{subtitle}</Header.Subheader>
    </Header>
    <div className='PageContent-content'>
      {children}
    </div>
  </Container>
);

PageContent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element).isRequired,
  ]),
};

export default PageContent;
