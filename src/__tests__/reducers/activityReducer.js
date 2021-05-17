import activityReducer from '../../reducers/activityReducer';
import {
  fetchUserActivity, createActivity, updateActivity, deleteActivity,
} from '../../actions/activity';

describe('Book Reducer', () => {
  it('Should return the default state', () => {
    const state = activityReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = fetchUserActivity('Action');
    const state = activityReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = createActivity('Action');
    const state = activityReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = updateActivity('Action');
    const state = activityReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = deleteActivity('Action');
    const state = activityReducer(undefined, action);
    expect(state).toEqual([]);
  });
});
