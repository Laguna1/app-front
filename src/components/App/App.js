import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login';
import Signup from '../Signup';
import WorkPage from '../WorkPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.LogInStatus;
  }

  handleLogIn(data) {
    console.log(data);
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
    const { isLoggedIn, user } = this.state;
    return (
      <Router>
        <div className="App">
          <p className="h1">Hi there (APP FRONT)!!!</p>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Header loggedInStatus={isLoggedIn} />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} user={user} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} />
              )}
            />
            <Route
              exact
              path="/workpage"
              render={() => (
                <WorkPage />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
