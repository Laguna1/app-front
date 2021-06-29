import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-session';
import trackReducer from './track/track.reducer';
import userReducer from './userReducer';
import activityReducer from './activityReducer';
import trackingReducer from './trackingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
  tracking: trackingReducer,
  track: trackReducer,
  session: sessionReducer,
});
export default rootReducer;
