import React from 'react';
import PropTypes from 'prop-types';

const NumberForm = ({
  id, handleChange, value, increment, decrement, label,
}) => (
  <div className="number-form">
    <label htmlFor={id}>{label}</label>
    <span
      onClick={decrement}
      onKeyPress={decrement}
      role="link"
      tabIndex={0}
      className="number-form__decrement"
    >
      -
    </span>
    <input
      id={id}
      type="string"
      onChange={handleChange}
      value={value}
      required
    />
    <span
      onClick={increment}
      onKeyPress={increment}
      role="link"
      tabIndex={0}
      className="number-form__increment"
    >
      +
    </span>
  </div>
);

const { string, func, number } = PropTypes;

NumberForm.propTypes = {
  id: string.isRequired,
  handleChange: func.isRequired,
  value: number.isRequired,
  label: string.isRequired,
  increment: func.isRequired,
  decrement: func.isRequired,
};

export default NumberForm;
