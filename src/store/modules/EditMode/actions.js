/* eslint-disable import/prefer-default-export */

export const toggleEditMode = ({ state, commit }) => {
  commit('updateEditMode', { editModeState: !state.editMode });
};
