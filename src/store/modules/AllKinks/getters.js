/* eslint-disable import/prefer-default-export */

export const getKinksForUser = (state, getters) => (username) => (
  (
    state.userKinks.filter(
      (el) => (el.username === username),
    )[0] || getters.getDefaultUser
  ).kinks
);

export const getDefaultUser = (state) => state.userKinks.filter(
  (el) => el.username === 'default',
);

export const getAvailableUsers = (state) => {
  return state.userKinks.map(
    (el) => (el.username)
  );
};

export const getLastUpdateForUser = (state) => (username) => (
  state.userKinks
    .sort(
      (a,b) => (a.lastUpdated > b.lastUpdated)
    )
    .find(
      (el) => (el.username === username)
    ).lastUpdated
);
