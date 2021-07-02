import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  name, type, handleChange, value, placeholder, id,
}) => (
  <div>
    <label htmlFor={id}>{name}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      id={id}
    />
  </div>
);

const { string, func } = PropTypes;

FormInput.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  placeholder: string.isRequired,
  id: string.isRequired,
};

export default FormInput;
