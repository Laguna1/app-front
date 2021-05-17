import trackingReducer from '../../reducers/trackingReducer';
import {
  fetchActivityItems, createItem, deleteItem, updateItem,
} from '../../actions/tracking';

describe('Book Reducer', () => {
  it('Should return the default state', () => {
    const state = trackingReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = fetchActivityItems('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = createItem('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = deleteItem('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = updateItem('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });
});
