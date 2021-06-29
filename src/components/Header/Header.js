import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import PropTypes from 'prop-types';

import { selectAuthenticated } from '../reducers/session/session.selectors';

const Header = ({ authenticated }) => {
  const logout = () => {
    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/logout',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            sessionService.deleteSession()
              .then(() => {
                sessionService.deleteUser();
              });
          })
          .catch((err) => {
            // eslint-disable-next-line
              console.log(err);
          });
      })
      .catch((err) => {
        // eslint-disable-next-line
            console.log(err);
      });
  };

  return (
    <div className="header">
      <Link to="/">
        TRACKING APP
      </Link>
      <div>
        {authenticated ? (
          <div
            onClick={() => logout()}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
          >
            LOG OUT
          </div>
        ) : (
          <Link to="/signin">
            LOG IN
          </Link>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
});

export default connect(mapStateToProps)(Header);
