/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import defaultKinks from '@/store/modules/AllKinks/index';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const state = () => ({
  curKinks: defaultKinks,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
