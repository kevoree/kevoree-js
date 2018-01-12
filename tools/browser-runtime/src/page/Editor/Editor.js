import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

import PageContent from '../../component/PageContent';
import KevScript from '../../component/KevScript';

import { makeCancelable } from '../../lib/util';

import './Editor.css';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: null,
      script: props.services.kevs.script,
      canSubmit: false,
      processing: false
    };
  }

  submit = () => {
    if (this.state.model) {
      this.setState({ canSubmit: false, processing: true }, () => {
        this.deployPromise = makeCancelable(this.props.services.core.deploy(this.state.model));
        this.deployPromise.promise.then(
          () => this.setState({ script: '' }),
          (err) => {
            if (!err.isCanceled) {
              console.error('Deploy failed with submitted script\n' + err.stack);
            }
          }
        );
      });
    }
  }

  onChange = (script) => {
    this.props.services.kevs.script = script;
    this.setState({ canSubmit: false, processing: false });
  }

  onLintSuccess = ({ model }) => {
    this.setState({ canSubmit: true, processing: false, model });
  }

  onLintError = () => {
    this.setState({ canSubmit: false, processing: false });
  }

  componentWillUnmount() {
    if (this.deployPromise) {
      this.deployPromise.cancel();
    }
  }

  render() {
    const subtitle = (
      <span>
        Runtime adaptations using Kevoree Script (<a href='http://kevoree.org/docs/kevscript/introducing-kevscript.html' target='_blank' rel='noopener noreferrer'>what is it?</a>)
      </span>
    );

    const kevsProps = {
      kevs: this.props.services.kevs,
      getModel: this.props.getModel,
      value: this.state.script,
      onChange: this.onChange,
      onLintSuccess: this.onLintSuccess,
      onLintError: this.onLintError,
    };

    return (
      <PageContent title='KevScript Editor' subtitle={subtitle} >
        <div className='Editor-container'>
          <KevScript {...kevsProps} />
        </div>
        <Menu secondary className='Editor-menu'>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button
                content='Submit'
                icon='play'
                labelPosition='right'
                onClick={this.submit}
                disabled={!this.state.canSubmit}
                loading={this.state.processing}
                primary />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </PageContent>
    );
  }
}

Editor.propTypes = {
  services: PropTypes.object.isRequired,
  getModel: PropTypes.func.isRequired,
};
