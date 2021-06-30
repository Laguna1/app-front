import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectAuthenticated, selectUser } from '../../reducers/session/session.selectors';
import { logout } from '../../reducers/session/session.actions';
import './Header.css';

const Header = ({
  authenticated, logout, history, user: { username },
}) => (
  <header className="">
    <h3 className="">
      <Link to="/">
        Tracks
      </Link>
    </h3>
    <div>
      <nav>
        <Link to="/activitem">
          Add activity
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
              Log out
            </div>
          </div>
        </div>
      ) : (
        <Link to="/signup">
          Sign up
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
