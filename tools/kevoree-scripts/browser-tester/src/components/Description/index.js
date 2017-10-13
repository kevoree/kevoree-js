import React from 'react';
import PropTypes from 'prop-types';

import './description.css';

export default class Description extends React.Component {

  render() {
    const tdef = this.props.instance.getModelEntity().typeDefinition;
    return (
      <table className="description">
        <tbody>
          <tr>
            <td className="muted">Namespace</td>
            <td>{tdef.eContainer().name}</td>
          </tr>
          <tr>
            <td className="muted">Name</td>
            <td>{tdef.name}</td>
          </tr>
          <tr>
            <td className="muted">Version</td>
            <td>{tdef.version}</td>
          </tr>
          <tr>
            <td className="muted">DeployUnit</td>
            <td>{tdef.deployUnits.array[0].name}@{tdef.deployUnits.array[0].version}</td>
          </tr>
          <tr>
            <td className="muted">Hashcode</td>
            <td>{tdef.deployUnits.array[0].hashcode}</td>
          </tr>
        </tbody>
      </table>
    );
  }

}

Description.propTypes = {
  instance: PropTypes.object,
};
