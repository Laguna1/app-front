import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectAuthenticated, selectUser } from '../../reducers/session/session.selectors';
import { logout } from '../../reducers/session/session.actions';

const Header = ({
  authenticated, logout, history, user: { username },
}) => (
  <header className="header">
    <div>
      <Link to="/">
        TRACK.IT
      </Link>

      <nav>
        <Link to="/activitem">
          Create track for your new activity
        </Link>
      </nav>
    </div>
    <div>
      {authenticated ? (
        <div className="">
          <div className="">
            {username}
          </div>
          <div className="">
            <div
              onClick={() => logout(history)}
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
            >
              LOG OUT
            </div>
          </div>
        </div>
      ) : (
        <Link to="/signup">
          SIGN UP
        </Link>
      )}
    </div>
  </header>
);

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
