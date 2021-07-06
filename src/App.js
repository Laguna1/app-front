import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './containers/homePage';
import SignIn from './containers/Login';
import SignUp from './containers/Signup';
import NotFound from './containers/NotFound/notFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ActivItem from './containers/Activ/ActivItem';
import Activ from './containers/Activ/activ';
import Progress from './containers/Progress/progress';
import Routing from './components/routing';
import { selectChecked, selectAuthenticated } from './reducers/session/session.selectors';

const App = ({ authenticated, checked }) => (
  <div className="app">
    <Header />
    { checked
          && (
          <Switch>
            <Routing exact path="/" component={HomePage} authenticated={authenticated} />
            <Routing path="/activItem" component={ActivItem} authenticated={authenticated} />
            <Routing path="/progress" component={Progress} authenticated={authenticated} />
            <Routing path="/activ/:activId" component={Activ} authenticated={authenticated} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/*" component={NotFound} />
          </Switch>
          )}
    <Footer />
  </div>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
  checked: selectChecked,
});

export default connect(
  mapStateToProps,
  null,
)(App);
