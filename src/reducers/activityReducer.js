import {
  DISPLAY_FETCHED_ACTIVITY,
  CREATE_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY,
} from '../actions/activity';

let updateObj = {};
let objIndex = {};
let updatedState = [];

export default function activityReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_ACTIVITY:
      return action.payload;
    case CREATE_ACTIVITY:
      return [...state, action.data];
    case DELETE_ACTIVITY:
      return state.filter((el) => el.id !== action.payload.id);
    case UPDATE_ACTIVITY:
      objIndex = state.findIndex((obj) => obj.id === action.payload.id);
      updateObj = {
        ...state[objIndex],
        description: action.payload.description,
        name: action.payload.name,
      };

      updatedState = [
        ...state.slice(0, objIndex),
        updateObj,
        ...state.slice(objIndex + 1),
      ];
      return updatedState;
    default:
      return state;
  }
}
