import axios from 'axios';
import {
  fetchUserActivityUrl, createActivityUrl, updateActivityUrl, deleteActivityUrl,
} from './api';

export const DISPLAY_FETCHED_ACTIVITY = 'DISPLAY FETCHED ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_ACTIVITY_ERROR = 'CREATE ACTIVITY ERROR';
export const UPDATE_ACTIVITY = 'UPDATE ACTIVITY';

export const fetchUserActivity = (id) => (dispatch) => axios.get(fetchUserActivityUrl(id))
  .then((response) => response.data)
  .then((data) => {
    dispatch({
      type: DISPLAY_FETCHED_ACTIVITY,
      payload: data,
    });
  })
  .catch((error) => {
    throw (error);
  });

export const createActivity = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: 'POST',
      url: createActivityUrl(data.user_id),
      data,
      crossdomain: true,
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });
    dispatch({
      type: CREATE_ACTIVITY,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_ACTIVITY_ERROR, payload: error });
  }
};

export const deleteActivity = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACTIVITY, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: updateActivityUrl(data.userId, data.id),
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateActivity = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ACTIVITY, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: deleteActivityUrl(data.userId, data.id),
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
