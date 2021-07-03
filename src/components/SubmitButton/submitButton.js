import React from 'react';
import PropTypes from 'prop-types';
import './SubmitButton.css';

const SubmitButton = ({ children }) => (
  <button
    className="btn-login"
    type="submit"
  >
    {children}
  </button>
);

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
