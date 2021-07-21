import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import FormInput from '../../components/formInput';
import SubmitButton from '../../components/SubmitButton/submitButton';
import './Signup.css';
import { baseUrl } from '../../utilities/api';

const SignUp = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setIsError(false);
      axios({
        method: 'post',
        url: `${baseUrl}/sign_up`,
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
        .catch(() => {
          setIsError(true);
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
    <div className="signup-page">
      <div className="signup">
        <h2>New account</h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="Username: "
            type="username"
            handleChange={handleUsernameChange}
            value={username}
            placeholder="Username"
          />
          <FormInput
            name="Password: "
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            placeholder="Password"
          />

          <FormInput
            name="ConfirmPassword: "
            type="password"
            handleChange={handleConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm password"
          />
          (
          {isError && <div>
                        <ul className="errors">
                          <li>Username can`t be blank</li>
                          <li>Password can`t be blank</li>
                          <li>ConfirmPassword can`t be blank</li>
                        </ul>
                      </div>}
          )
          <div>
            <SubmitButton> Sign up </SubmitButton>
          </div>
          <span className="text">Already registered?</span>
          <div className="text-login">
            <Link to="signin">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SignUp);
