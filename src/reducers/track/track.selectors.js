import { createSelector } from 'reselect';

const selectTrack = (state) => state.track;

export const selectTracks = createSelector(
  [selectTrack],
  (track) => track.tracks,
);

export const myTraining = () => 'myTraining';
