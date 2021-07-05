/*
 * Source
 * https://vueschool.io/articles/vuejs-tutorials/home-rolled-store-with-the-vue-js-composition-api/
 */

import { reactive, computed } from 'vue';
/**
 * Key used to store the editMode setting
 */
const EDITMODEKEY = 'editMode';

/*
 * The internal state dictionary
 */
const state = reactive({
  /*
   * State of the editMode
   * @values true, false
   */
  editMode: localStorage.getItem(EDITMODEKEY) || false,
});

/*
 * Function to get the editMode
 */
const getEditMode = computed(() => state.editMode);

/*
 * Function to toggle the editMode
 */
const toggleEditMode = () => {
  state.editMode = !state.editMode;
  localStorage.setItem(EDITMODEKEY, state.editMode);
};

export default () => ({
  getEditMode,
  toggleEditMode,
});
