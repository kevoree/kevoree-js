import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { getType } from '../../lib/model-helper';

import './inputs.css';

const Inputs = ({ inputs, instance }) => {
  const typeClass = instance.getModelEntity().typeDefinition.metaClassName();

  let content;
  if (inputs.length > 0) {
    content = inputs.map((input, i) => (
      <Input key={i} port={input} instance={instance} />
    ));
  } else {
    content = <em className="muted">This {getType(typeClass)} has no input port</em>;
  }

  return <div className="inputs">{content}</div>;
};

Inputs.propTypes = {
  inputs: PropTypes.array.isRequired,
  instance: PropTypes.object.isRequired,
};

export default Inputs;
