import React from 'react';
import PropTypes from 'prop-types';

const TextForm = ({
  id, handleChange, value, label,
}) => (
  <div className="">
    <div className="">
      <input
        id={id}
        className=""
        name="Name: "
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Name"
        required
      />
      <label htmlFor={id} className="">{label}</label>
      <div className="" />
    </div>
  </div>
);

const { string, func } = PropTypes;

TextForm.propTypes = {
  id: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  label: string.isRequired,
};

export default TextForm;
