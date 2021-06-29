import { combineReducers } from 'redux';
import userReducer from './userReducer';
import activityReducer from './activityReducer';
import trackingReducer from './trackingReducer';
import { sessionReducer } from 'redux-session';

const rootReducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
  tracking: trackingReducer,
  session: sessionReducer,
});
export default rootReducer;
