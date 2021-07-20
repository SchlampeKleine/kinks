/* eslint-disable import/prefer-default-export */

export const updateUserKinks = (state, { userKinks }) => {
  state.userKinks = [...userKinks];
};
