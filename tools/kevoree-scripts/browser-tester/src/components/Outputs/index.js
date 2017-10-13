import React from 'react';
import PropTypes from 'prop-types';
import Output from '../Output';
import { getType } from '../../lib/model-helper';

import './outputs.css';

const Inputs = ({ outputs, instance }) => {
  const typeClass = instance.getModelEntity().typeDefinition.metaClassName();

  let content;
  if (outputs.length > 0) {
    content = outputs.map((output, i) => (
      <Output key={i} port={output} instance={instance} />
    ));
  } else {
    content = <em className="muted">This {getType(typeClass)} has no output port</em>;
  }

    return <div className="outputs">{content}</div>;
};

Inputs.propTypes = {
  outputs: PropTypes.array.isRequired,
  instance: PropTypes.object.isRequired,
};

export default Inputs;
