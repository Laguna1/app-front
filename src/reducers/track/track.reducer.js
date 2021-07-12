import TrackActionTypes from './track.types';
import { defaultTracks } from './track.data';

const INITIAL_STATE = {
  tracks: defaultTracks,
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TrackActionTypes.ADD_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
};

export default trackReducer;
