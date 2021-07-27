import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { openActivItem } from '../../reducers/session/session.actions';

const Homepage = ({
  history, openActivItem,
}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const item = new Date(Date.now());
      openActivItem(item, history);
    }

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, []);

  return (
    <div />
  );
};

const { shape, func } = PropTypes;

Homepage.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  openActivItem: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openActivItem: (item, history) => dispatch(openActivItem(item, history)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Homepage));
