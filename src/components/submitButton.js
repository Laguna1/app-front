import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ children }) => (
  <button
    type="submit"
  >
    {children}
  </button>
);

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
