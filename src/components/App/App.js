import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import Activity from '../../containers/Activity';
import Trackings from '../../containers/Tracking';
import Footer from '../Footer/Footer';
import { loginStatus } from '../../actions/user';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addForm: false,
    };
  }

  componentDidMount() {
    const { loginStatus } = this.props;
    loginStatus();
  }

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  render() {
    const { isLogin } = this.props;
    const { addForm } = this.state;

    return (
      <Router>
        <div className="App">
          <Header />
          <Footer displayForm={this.displayForm} addForm={addForm} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                isLogin ? (
                  <Activity />
                ) : (
                  <Login />
                )
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup />
              )}
            />
            <Route
              exact
              path="/main"
              render={() => (
                isLogin ? (
                  <Activity />
                )
                  : (
                    <div className="login-access">
                      <p>Please Sign In</p>
                    </div>
                  )
              )}

            />
            <Route
              path="/activity/:id"
              render={({ match }) => (
                isLogin ? (
                  <div className="route-trackings">
                    <Trackings match={match} displayForm={this.displayForm} addForm={addForm} />
                    <Footer displayForm={this.displayForm} addForm={addForm} match={match} />
                  </div>
                )

                  : (
                    <div className="login-access">
                      <p>Please Sign In</p>

                    </div>
                  )
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  isLogin: PropTypes.bool,
  loginStatus: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    username: PropTypes.string,
  }),
};

App.defaultProps = {
  isLogin: false,
  loginStatus: () => {},
  user: {},
};

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  user: state.user,
  activity: state.activity,
});
const mapDispatchToProps = (dispatch) => ({
  loginStatus: () => dispatch(loginStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
