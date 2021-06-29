import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormInput from '../../components/formInput';
import SubmitButton from '../../components/submitButton';
import { login } from '../../reducers/session/session.actions';

const SignIn = ({ history, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    login(username, password, history);
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your name and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="username"
          handleChange={handleUsernameChange}
          value={username}
          placeholder="username"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          placeholder="password"
        />
        <div>
          <SubmitButton> Sign in </SubmitButton>
        </div>
      </form>
    </div>
  );
};
SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, history) => dispatch(login(username, password, history)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
