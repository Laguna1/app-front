import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import FormInput from '../../components/formInput';
import SubmitButton from '../../components/submitButton';

const SignUp = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/sign_up',
        data: {
          data: {
            attributes: {
              username,
              password,
            },
          },
        },
      })
        .then(() => {
          history.push('/signin');
        })
        .catch((err) => {
          // eslint-disable-next-line
              console.log(err);
        });
    }
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleConfirmPassword = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  return (
    <div className="sign-up">
      <h2>Create an account</h2>
      <span>Sign up with your username and password</span>

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

        <FormInput
          name="confirmPassword"
          type="password"
          handleChange={handleConfirmPassword}
          value={confirmPassword}
          placeholder="confirm password"
        />

        <div>
          <SubmitButton> Sign up </SubmitButton>
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SignUp);
