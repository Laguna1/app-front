import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import FormInput from '../../components/formInput';
import SubmitButton from '../../components/SubmitButton/submitButton';
import { login } from '../../reducers/session/session.actions';
import './Login.css';

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
    <div className="login-page">
      <div className="login">
        <span className="text-login">Log in</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="Username:"
            type="username"
            handleChange={handleUsernameChange}
            value={username}
            placeholder="username"
            required
        />
          <FormInput
            name="Password:"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            placeholder="password"
            required
        />
          <div>
            <div className="">
              <SubmitButton> Log in </SubmitButton>
            </div>
            <span className="text-signup">New user?</span>
            <div className="btn-signup">
              <Link to="signup">Sign up</Link>
            </div>
          </div>
        </form>
      </div>
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
