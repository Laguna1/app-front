import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { selectTracksForProgress, selectTrackForProgress } from '../reducers/track/track.selectors';

const Progress = ({ tracks, track: { attributes: { name } } }) => (
  <div>
    <h2 className="progress-page-title">
      {name}
      <span> diagram</span>
    </h2>
    <BarChart
      width={500}
      height={300}
      data={tracks}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="distance" fill="#8884d8" />
    </BarChart>

    <BarChart
      width={500}
      height={300}
      data={tracks}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="duration" fill="#82ca9d" />
    </BarChart>
  </div>
);

const {
  string, number, arrayOf, shape,
} = PropTypes;

Progress.propTypes = {
  tracks: arrayOf(
    shape({
      item: string,
      distance: number,
      duration: number,
    }),
  ).isRequired,
  track: shape({
    attributes: shape({
      name: string,
    }),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  tracks: selectTracksForProgress,
  track: selectTrackForProgress,
});

export default connect(
  mapStateToProps,
  null,
)(Progress);
