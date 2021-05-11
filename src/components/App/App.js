import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header';
import Login from '../Login';
import Signup from '../Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.LogInStatus;
  }

  handleLogIn(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  }

  logInStatus() {
    axios.get('http://localhost:3001/logged_in',
      { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogIn(response);
        } else {
          this.handleLogOut();
        }
      })
      .catch((error) => console.log('api errors:', error));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <p className="h1">Hi there (APP FRONT)!!!</p>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
