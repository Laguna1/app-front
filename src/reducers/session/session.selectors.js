import { createSelector } from 'reselect';

const selectSession = (state) => state.session;
export const selectUser = createSelector(
  [selectSession],
  (session) => session.user,
);
export const selectAuthenticated = createSelector(
  [selectSession],
  (session) => session.authenticated,
);

export const selectChecked = createSelector(
  [selectSession],
  (session) => session.checked,
);
