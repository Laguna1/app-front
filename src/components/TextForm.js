import React from 'react';
import PropTypes from 'prop-types';

const TextForm = ({
  id, componentClassName, handleChange, value, label,
}) => (
  <div className="form-text">
    <div className={`${componentClassName}__form-text__control`}>
      <label htmlFor={id} className={`${componentClassName}__form-text__label`}>{label}</label>
      <input
        id={id}
        className={`${componentClassName}__form-text__input`}
        name="Name: "
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Name"
        required
      />

      <div className={`${componentClassName}__form-text__bar`} />
    </div>
  </div>
);

const { string, func } = PropTypes;

TextForm.propTypes = {
  id: string.isRequired,
  componentClassName: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  label: string.isRequired,
};

export default TextForm;
