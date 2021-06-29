import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  name, type, handleChange, value, placeholder,
}) => (
  <div>
    <input
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </div>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default FormInput;
