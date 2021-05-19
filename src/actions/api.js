/* eslint-disable camelcase */
export const baseUrl = 'http://localhost:3000';
export const fetchUserActivityUrl = (user_id) => `${baseUrl}/users/${user_id}/activities`;
export const createActivityUrl = (user_id) => `${baseUrl}/users/${user_id}/activities`;
export const updateActivityUrl = (user_id, id) => `${baseUrl}/users/${user_id}/activities/${id}`;
export const deleteActivityUrl = (user_id, id) => `${baseUrl}/users/${user_id}/activities/${id}`;
export const fetchReadingDaysUrl = (user_id, activity_id) => `${baseUrl}/users/${user_id}/activities/${activity_id}/trackings`;
export const createItemUrl = (user_id, activity_id) => `${baseUrl}/users/${user_id}/activities/${activity_id}/trackings`;
export const deleteItemUrl = (user_id, activity_id, id) => `${baseUrl}/users/${user_id}/activities/${activity_id}/trackings/${id}`;
export const updateItemUrl = (user_id, activity_id, id) => `${baseUrl}/users/${user_id}/activities/${activity_id}/trackings/${id}`;
