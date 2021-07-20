/* eslint-disable import/prefer-default-export */

export const saveKinksForUser = ({ state, commit }, { username, kinks }) => {
  const tmpUserKinks = state.userKinks;
  const userIndex = tmpUserKinks.findIndex(
    (el) => el.username === username,
  );

  if (userIndex > -1) {
    tmpUserKinks[userIndex].kinks = kinks;
  } else {
    tmpUserKinks.push({
      username,
      kinks,
    });
  }
  commit('updateUserKinks', {
    userKinks: [...tmpUserKinks],
  });
};
