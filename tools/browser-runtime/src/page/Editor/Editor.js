import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

import PageContent from '../../component/PageContent';
import KevScript from '../../component/KevScript';

import './Editor.css';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { script: '// Write your KevScript directly here\n' };
  }

  handleChange = (script) => {
    this.setState({ script });
  }

  submit = () => {}

  render() {
    const subtitle = (
      <span>
        Runtime adaptations using Kevoree's own script DSL&nbsp;-&nbsp;
        <a href='http://kevoree.org/docs/kevscript/introducing-kevscript.html' target='_blank' rel='noopener noreferrer'>more info</a>
      </span>
    );

    const kevsProps = {
      kevs: this.props.kevs,
      getModel: this.props.getModel,
      defaultScript: this.state.script,
      onChange: this.handleChange
    };

    return (
      <PageContent title='KevScript Editor' subtitle={subtitle} >
        <div className='Editor-container'>
          <KevScript {...kevsProps} />
        </div>
        <Menu secondary>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary onClick={this.submit}>Submit script</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </PageContent>
    );
  }
}

Editor.propTypes = {
  kevs: PropTypes.object.isRequired,
  getModel: PropTypes.func.isRequired,
};
