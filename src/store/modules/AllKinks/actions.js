/* eslint-disable import/prefer-default-export */

export const saveKinksForUser = ({ state, commit }, { username, kinks }) => {
  const tmpUserKinks = state.userKinks;
  const userIndex = tmpUserKinks.findIndex(
    (el) => el.username === username,
  );

  if (userIndex > -1) {
    tmpUserKinks[userIndex].kinks = kinks;
    tmpUserKinks[userIndex].lastUpdated = new Date();
  } else {
    tmpUserKinks.push({
      username,
      kinks,
      lastUpdated: new Date(),
    });
  }
  commit('updateUserKinks', {
    userKinks: [...tmpUserKinks],
  });
};

export const loadKinksForUser = ({ dispatch, commit, getters },{ username }) => {
  /**
   *  TODO
   *  Save curKinks if not already done
   */
  const tmpKinks = getters.getKinksForUser(username);
  console.log({ tmpKinks });
  dispatch('CurKinks/updateCurKinks', { ...tmpKinks }, { root: true });
};
