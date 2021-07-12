import TrackActionTypes from './track.types';

export const addTracks = (tracks) => ({
  type: TrackActionTypes.ADD_TRACKS,
  payload: tracks,
});

export const myTraining = () => 'myTraining';
