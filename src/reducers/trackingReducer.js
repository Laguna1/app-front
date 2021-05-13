import {
  DISPLAY_FETCHED_ITEMS, CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM,

} from '../actions/tracking';

let objIndex = {};
let updateElement = {};
let updatedState = [];

export default function trackingReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_ITEMS:
      return action.payload;
    case CREATE_ITEM:
      return [...state, action.data];
    case DELETE_ITEM:
      return state.filter((el) => el.id !== action.payload.id);
    case UPDATE_ITEM:
      objIndex = state.findIndex((obj) => obj.id === action.payload.id);

      updateElement = {
        ...state[objIndex],
        date: action.payload.date,
        duration: action.payload.duration,
        distance: action.payload.distance,
        pulse: action.payload.pulse,
        calories: action.payload.calories,
        rate: action.payload.rate,
      };
      updatedState = [
        ...state.slice(0, objIndex),
        updateElement,
        ...state.slice(objIndex + 1),
      ];
      return updatedState;
    default:
      return state;
  }
}
