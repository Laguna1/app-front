import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../../containers/entryGroup/Login';
import Signup from '../../containers/entryGroup/Signup';
import ActivityForm from '../../containers/activityGroup/ActivityForm';
import TrackingForm from '../../containers/trackingGroup/TrackingForm';
import { loginStatus } from '../../actions/user';

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
                  <ActivityForm />
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
              path="/workpage"
              render={() => (
                isLogin ? (
                  <ActivityForm />
                )
                  : (
                    <div className="login-access">
                      <p>Sign in please</p>
                    </div>
                  )
              )}

            />
            <Route
              path="/activity/:id"
              render={({ match }) => (
                isLogin ? (
                  <div className="route-trackings">
                    <TrackingForm match={match} displayForm={this.displayForm} addForm={addForm} />
                    <Footer displayForm={this.displayForm} addForm={addForm} match={match} />
                  </div>
                )

                  : (
                    <div className="login-access">
                      <p>Sign in please</p>
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
  illness: state.illness,
});
const mapDispatchToProps = (dispatch) => ({
  loginStatus: () => dispatch(loginStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
