import React from 'react';
import PropTypes from 'prop-types';

const TracksList = ({ tracks }) => (
  <ul>
    {tracks.map(({
      id,
      attributes: {
        name,
        distance,
        duration,
        repeat,
      },
    }) => (
      <li key={id}>
        <div>{name}</div>
        <div>{distance}</div>
        <div>{duration}</div>
        <div>{repeat}</div>
      </li>
    ))}
  </ul>
);

TracksList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      attributes: PropTypes.shape({
        name: PropTypes.string,
        distance: PropTypes.number,
        duration: PropTypes.number,
        repeat: PropTypes.number,
      }),
    }),
  ).isRequired,
};

export default TracksList;
