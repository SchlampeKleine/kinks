/* eslint-disable import/prefer-default-export */
export const updateCurKinks = (state, { kinks }) => {
  state.curKinks = { ...kinks };
};
