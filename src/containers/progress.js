import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { selectTracks } from '../reducers/track/track.selectors';

const Progress = ({ tracks }) => (
  <div>
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

Progress.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string,
      distance: PropTypes.number,
      duration: PropTypes.number,
    }),
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  tracks: selectTracks,
});

export default connect(
  mapStateToProps,
  null,
)(Progress);
