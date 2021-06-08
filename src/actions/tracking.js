import axios from 'axios';

export const DISPLAY_FETCHED_ITEMS = 'DISPLAY FETCHED ITEMS';
export const CREATE_ITEM = 'CREATE ITEM';
export const DELETE_ITEM = 'DELETE ITEM';
export const CREATE_ITEM_ERROR = 'CREATE ITEM ERROR';
export const UPDATE_ITEM = 'UPDATE ITEM';

export const fetchActivityItems = (userId, activityId) => (dispatch) => axios.get(`https://final-api-backend.herokuapp.com/users/${userId}/activities/${activityId}/trackings`)
  .then((response) => [response.data])
  .then((data) => {
    dispatch({
      type: DISPLAY_FETCHED_ITEMS,
      payload: data,
    });
  })
  .catch((error) => {
    throw (error);
  });

export const createItem = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://final-api-backend.herokuapp.com/users/${data.userId}/activities/${data.activityId}/trackings `,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_ITEM,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_ITEM_ERROR, payload: error });
  }
};

export const deleteItem = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITEM, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: `https://final-api-backend.herokuapp.com/users/${data.userId}/activities/${data.activityId}/trackings/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateItem = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ITEM, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/users/${data.userId}/activities/${data.activityId}/trackings/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
