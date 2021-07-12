import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import './activItem.css';

import { openActivItem } from '../../reducers/session/session.actions';

const ActivItem = ({ history, openActivItem }) => {
  const onClickItem = (item) => {
    openActivItem(item, history);
  };

  return (
    <div className="calendar">
      <Calendar
        onClickDay={onClickItem}
        display="center"
      />
    </div>
  );
};

const { shape, func } = PropTypes;

ActivItem.propTypes = {
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
)(withRouter(ActivItem));
