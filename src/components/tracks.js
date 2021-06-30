import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addTracks } from '../reducers/track/track.actions';

const TracksList = ({
  tracks, addTracks, history,
}) => {
  const handleClick = (name) => {
    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/progress/${name}`,
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
    <div>
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
          onClick={() => handleClick(name)}
          onKeyPress={() => {}}
          role="link"
          tabIndex={0}
          key={id}
        >
          <div>{name}</div>
          <div>{distance}</div>
          <div>{duration}</div>
          <div>{repeat}</div>
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
