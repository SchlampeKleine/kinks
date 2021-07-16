/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import { selectedLocale } from '@/i18n';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const state = () => ({
  locale: selectedLocale,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
