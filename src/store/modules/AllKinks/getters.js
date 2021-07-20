/* eslint-disable import/prefer-default-export */

export const getKinksForUser = (state, getters) => (username) => {
  (
    state.userKinks.filter(
      (el) => (el.username === username),
    )[0] || getters.getDefaultUser
  ).kinks;
};

export const getDefaultUser = (state) => state.userKinks.filter(
  (el) => el.usename === 'default',
);
