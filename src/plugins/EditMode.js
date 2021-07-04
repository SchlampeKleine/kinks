/*
 * Source
 * https://vueschool.io/articles/vuejs-tutorials/home-rolled-store-with-the-vue-js-composition-api/
 */

import { reactive, computed } from 'vue';

const EDITMODEKEY = 'editMode';

const state = reactive({
  editMode: localStorage.getItem(EDITMODEKEY) || false,
});

const getEditMode = computed(() => state.editMode);

const toggleEditMode = () => {
  state.editMode = !state.editMode;
  localStorage.setItem(EDITMODEKEY, state.editMode);
};

export default () => ({
  getEditMode,
  toggleEditMode,
});
