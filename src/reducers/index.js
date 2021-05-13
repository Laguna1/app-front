import { combineReducers } from 'redux';
import userReducer from './userReducer';
import activityReducer from './activityReducer';
import trackingReducer from './trackingReducer';

export default combineReducers({
  user: userReducer,
  activity: activityReducer,
  tracking: trackingReducer,
});
