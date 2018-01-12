import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

import './Loading.css';

const Loading = ({ type, title, msg, icon }) => (
  <div className='Loading-container'>
    <Message className='Loading-msg' icon error={type === 'error'}>
      <Icon name={icon} />
      <Message.Content>
        <Message.Header className='Loading-header'>{title}</Message.Header>
        {msg}
      </Message.Content>
    </Message>
  </div>
);

export default Loading;
