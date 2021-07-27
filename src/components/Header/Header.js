import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './Header.css';
import PropTypes from 'prop-types';

import { selectAuthenticated, selectUser } from '../../reducers/session/session.selectors';
import { logout } from '../../reducers/session/session.actions';

const Header = ({
  authenticated, logout, history, user: { username },
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <header className="header">
        <Link className="logo-title" to="/">
          Tracking App
        </Link>

        <div className="">
          {authenticated ? (
            <div className="">
              <nav className="">
                <Link className="add-item" to="/activitem">
                  +
                </Link>
              </nav>
              <div className="user-profile">{username}</div>
              <div className="logged-user-name">
                <div
                  onClick={() => logout(history)}
                  onKeyPress={() => {}}
                  role="button"
                  tabIndex={0}
                >
                  <i className="fa fa-sign-out fa-2x" aria-hidden="true" />
                </div>
              </div>
            </div>
          ) : (
            <Link className="logged-item" to="/signin">
              Log in1
            </Link>
          )}
          <div
            className=""
            onClick={() => setHidden((hidden) => !hidden)}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
          >
            <span className="">&nbsp;</span>
          </div>
        </div>
      </header>
      <nav className={`logged ${hidden ? 'hidden' : ''}`}>
        <Link className="logged-item" to="/activitem">
          Choose day
        </Link>
        {authenticated ? (
          <div
            className="logged-item"
            onClick={() => logout(history)}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
          >
            <i className="fa fa-sign-out" aria-hidden="true" />
          </div>
        ) : (
          <Link className="logged-item" to="/signin">
            Log in
          </Link>
        )}
      </nav>
    </div>
  );
};

Header.defaultProps = {
  user: { username: '' },
};

const {
  bool, func, shape, string,
} = PropTypes;

Header.propTypes = {
  authenticated: bool.isRequired,
  logout: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  user: shape({
    username: string,
  }),
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
