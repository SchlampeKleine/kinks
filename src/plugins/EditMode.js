/*
 * Source
 * https://vueschool.io/articles/vuejs-tutorials/home-rolled-store-with-the-vue-js-composition-api/
 */

import { reactive, computed } from 'vue';

const state = reactive({
  editMode: false,
});

const getEditMode = computed(() => state.editMode);

const toggleEditMode = () => {
  state.editMode = !state.editMode;
};

export default () => ({
  getEditMode,
  toggleEditMode,
});
