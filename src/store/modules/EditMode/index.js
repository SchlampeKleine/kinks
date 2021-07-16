/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const state = () => ({
  editMode: false,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
