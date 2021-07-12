import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Routing = ({
  component, exact = false, path, authenticated,
}) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => (
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
        />
      )

    )}
  />
);

const {
  object, bool, string, func, oneOfType,
} = PropTypes;

Routing.defaultProps = {
  exact: false,
  location: {},
};

Routing.propTypes = {
  component: oneOfType([
    func,
    // eslint-disable-next-line
        object,
  ]).isRequired,
  exact: bool,
  path: string.isRequired,
  authenticated: bool.isRequired,
  // eslint-disable-next-line
  location: object,
};

export default Routing;
