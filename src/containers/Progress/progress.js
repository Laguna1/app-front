import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { selectTracksForProgress, selectTrackForProgress } from '../../reducers/track/track.selectors';
import './progress.css';

const Progress = ({ tracks, track: { attributes: { name } } }) => (
  <div className="progress-page">
    <h2 className="progress-page-title">
      <span> Diagram for: </span>
      {name}
    </h2>
    <BarChart
      width={300}
      height={200}
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
      <Bar dataKey="distance" fill="#8fe18b" />
    </BarChart>

    <BarChart
      width={300}
      height={200}
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
      <Bar dataKey="duration" fill="#f22527" />
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
