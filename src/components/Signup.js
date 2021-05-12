import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeName(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { handleLogin } = this.props;
    const user = {
      username,
      password,
    };

    axios.post('http://localhost:3001/users', { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'created') {
          handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      // eslint-disable-next-line
      .catch((error) => console.log('api errors:', error));
  }

  handleErrors() {
    const { errors } = this.state;
    return (
      <div>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      </div>
    );
  }

  redirect() {
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {
    const { username, password, errors } = this.state;
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
        </form>
        <div>
          { errors ? this.handleErrors() : null }
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  handleLogin: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  history: {},
};
export default Signup;
