import TrackActionTypes from './track.types';
import { defaultTracks } from './track.data';
import { mapTracksToChart } from './track.utils';

const INITIAL_STATE = {
  tracks: mapTracksToChart(defaultTracks),
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TrackActionTypes.ADD_TRACKS:
      return {
        ...state,
        tracks: mapTracksToChart(action.payload),
      };
    default:
      return state;
  }
};

export default trackReducer;
