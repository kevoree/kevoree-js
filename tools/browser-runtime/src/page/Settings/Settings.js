import React from 'react';
import { Input } from 'semantic-ui-react';
import PageContent from '../../component/PageContent';

import './Settings.css';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registry: props.registry,
    };
  }

  onChange(key, val) {
    console.log(key, val);
  }

  render() {
    return (
      <PageContent title='Settings'>
        <Input
          fluid
          label='Registry'
          placeholder='eg. https://registry.kevoree.org'
          value={this.state.registry || 'https://registry.kevoree.org'}
          onChange={(evt) => this.onChange('registry', evt.target.value)} />
      </PageContent>
    );
  }
}
