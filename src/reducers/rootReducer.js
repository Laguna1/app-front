import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-session';
import trackReducer from './track/track.reducer';

const rootReducer = combineReducers({
  track: trackReducer,
  session: sessionReducer,
});

export default rootReducer;
