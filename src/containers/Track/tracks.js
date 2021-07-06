import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './track.css';

import { addTracks } from '../../reducers/track/track.actions';
import { baseUrl } from '../../utilities/api';

const TracksList = ({
  tracks, addTracks, history,
}) => {
  const handleClick = (name) => {
    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `${baseUrl}/progress/${name}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            addTracks(data);
            history.push('/progress');
          })
          .catch(() => {
            history.push('/not-found');
          });
      })
      .catch(() => {
        history.push('/signin');
      });
  };

  return (
    <div className="tracks-list">
      <h3>Track`s list</h3>
      {tracks.map(({
        id,
        attributes: {
          name,
          distance,
          duration,
          repeat,
        },
      }) => (
        <div
          className="track"
          onClick={() => handleClick(name)}
          onKeyPress={() => {}}
          role="link"
          tabIndex={0}
          key={id}
        >
          <div className="one-train">
            {` Exercize: ${name}`}
          </div>
          <div>
            {`Distance: ${distance} meters`}
          </div>
          <div>
            {`${repeat}repeats with ${duration} min. each time`}
          </div>
        </div>
      ))}
    </div>
  );
};

const {
  string, number, func, arrayOf, shape,
} = PropTypes;

TracksList.propTypes = {
  tracks: arrayOf(
    shape({
      id: string,
      attributes: shape({
        name: string,
        distance: number,
        duration: number,
        repeat: number,
      }),
    }),
  ).isRequired,
  addTracks: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addTracks: (tracks) => dispatch(addTracks(tracks)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(TracksList));
