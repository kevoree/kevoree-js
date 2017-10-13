import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

export default class RouterModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  redirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.props.to} />;
    } else {
      return (
        <Modal open={true} onClose={this.redirect}>
          {this.props.children}
          <Modal.Actions>
            <Button onClick={this.redirect}>Close</Button>
          </Modal.Actions>
        </Modal>
      );
    }
  }
}

RouterModal.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element).isRequired,
  ]),
};
