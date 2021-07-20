/* eslint-disable import/prefer-default-export */

export const updateCurrentUsername = ({ commit }, newUsername) => {
  commit('updateCurrentUsername', { username: newUsername });
};
