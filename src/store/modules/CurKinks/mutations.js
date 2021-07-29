/* eslint-disable import/prefer-default-export */

export const updateCurKinks = (state, { curKinks }) => {
  const debug = false;
  if (debug) {
    console.log({ 'updateCurKinks to': curKinks });
  }
  state.curKinks = { ...curKinks };
};

/**
 * mark curKinks as imported
 */
export const markAsImported = (state) => state.imported = true;
