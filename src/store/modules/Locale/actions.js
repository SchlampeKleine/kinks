/* eslint-disable import/prefer-default-export */
export const changeLocale = ({ state, commit }, newLocale) => {
  commit('updateLocale', newLocale);
};
