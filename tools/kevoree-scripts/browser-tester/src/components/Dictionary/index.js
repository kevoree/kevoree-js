import React from 'react';
import PropTypes from 'prop-types';
import Param from '../Param';
import {getType} from '../../lib/model-helper';

import './dictionary.css';

const CheckOrCross = ({ value }) => {
  if (value) {
    return <span className="green">✔</span>;
  } else {
    return <span className="yellow">✘</span>;
  }
};

CheckOrCross.propTypes = {
  value: PropTypes.bool,
};

export default class Dictionary extends React.Component {

  render() {
    const modelInstance = this.props.instance.getModelEntity();
    const tdef = modelInstance.typeDefinition;
    const params = tdef.dictionaryType.attributes.array.map((attr) => {
      const value = modelInstance.dictionary.findValuesByID(attr.name);
      return { attr, param: value ? value : attr.defaultValue };
    });

    if (params.length > 0) {
      return (
        <table className="dictionary">
          <thead>
            <tr>
              <th>Name</th>
              <th>Datatype</th>
              <th>Default value</th>
              <th>Optional?</th>
              <th>Fragmented?</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {params.map(({ param, attr }, i) => (
              <tr key={i}>
                <td>{param.name}</td>
                <td>{attr.datatype.toString()}</td>
                <td style={{
                  fontFamily: 'monospace',
                  fontSize: 16
                }}>{param.value}</td>
                <td><CheckOrCross value={attr.optional}/></td>
                <td><CheckOrCross value={attr.fragmentDependant}/></td>
                <td><Param param={param} attr={attr} instance={this.props.instance}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <em className="muted">This {getType(tdef.metaClassName())} has no parameter</em>
      );
    }
  }

}

Dictionary.propTypes = {
  instance: PropTypes.object,
};
