import { createSelector } from 'reselect';
import { mapTracksToChart } from './track.utils';

const selectTrack = (state) => state.track;

export const selectTracks = createSelector(
  [selectTrack],
  (track) => track.tracks,
);

export const selectTracksForProgress = createSelector(
  [selectTracks],
  (tracks) => mapTracksToChart(tracks),
);

export const selectTrackForProgress = createSelector(
  [selectTracks],
  (tracks) => tracks[0],
);

export const myTraining = () => 'myTraining';
